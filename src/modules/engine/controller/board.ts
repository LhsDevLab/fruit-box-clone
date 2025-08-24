import type { Board, Block } from '@/types/engine';
import { role, board } from '../status';

function makeBlockValues(): number[][] {
    const values: number[][] = [];

    // 2D 배열 초기화 (모든 값을 0으로 설정)
    for (let i = 0; i < role.height; i++) {
        const row: number[] = [];
        for (let j = 0; j < role.width; j++) {
            row.push(0);
        }
        values.push(row);
    }

    // 사용된 위치를 추적하는 배열
    const used: boolean[][] = Array(role.height)
        .fill(null)
        .map(() => Array(role.width).fill(false));

    // 1. 랜덤한 크기의 직사각형을 만들어서 그 꼭지점의 총합이 role.goalSum이 되도록 설정
    let attempts = 0;
    const maxAttempts = role.width * role.height * 2; // 안전장치

    while (attempts < maxAttempts) {
        attempts++;

        // 사용되지 않은 위치 찾기
        const availablePositions: [number, number][] = [];
        for (let i = 0; i < role.height; i++) {
            for (let j = 0; j < role.width; j++) {
                if (!used[i][j]) {
                    availablePositions.push([i, j]);
                }
            }
        }

        // 2. 이 행동을 빈 블록이 없을때 까지 반복
        if (availablePositions.length === 0) {
            break;
        }

        // 연속으로 실패하면 루프 종료 (마지막에 처리)
        if (attempts > maxAttempts * 0.8) {
            break;
        }

        // 랜덤한 시작 위치 선택
        const randomIndex = Math.floor(
            Math.random() * availablePositions.length,
        );
        const [startRow, startCol] = availablePositions[randomIndex];

        // 가능한 직사각형 크기 계산 (최소 2x1 또는 1x2)
        const possibleSizes: [number, number][] = [];

        // 가로, 세로 각각 최대 크기 계산
        for (
            let height = 1;
            height <= Math.min(4, role.height - startRow); // 최대 크기를 4로 제한
            height++
        ) {
            for (
                let width = 1;
                width <= Math.min(4, role.width - startCol); // 최대 크기를 4로 제한
                width++
            ) {
                // 1x1은 제외, 나머지는 허용
                if (height === 1 && width === 1) continue;

                // 해당 영역이 모두 사용 가능한지 확인
                let canPlace = true;
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        if (used[startRow + i][startCol + j]) {
                            canPlace = false;
                            break;
                        }
                    }
                    if (!canPlace) break;
                }

                if (canPlace) {
                    possibleSizes.push([height, width]);
                }
            }
        }

        if (possibleSizes.length === 0) {
            // 직사각형이 불가능하면 다음 위치로 넘어감
            continue;
        }

        // 랜덤한 크기 선택
        const [rectHeight, rectWidth] =
            possibleSizes[Math.floor(Math.random() * possibleSizes.length)];

        // 직사각형의 꼭지점 좌표 (4개 또는 2개)
        const corners: [number, number][] = [
            [startRow, startCol], // 좌상단
            [startRow, startCol + rectWidth - 1], // 우상단
            [startRow + rectHeight - 1, startCol], // 좌하단
            [startRow + rectHeight - 1, startCol + rectWidth - 1], // 우하단
        ];

        // 중복 제거 (직선의 경우 일부 꼭지점이 같을 수 있음)
        const uniqueCorners = corners.filter(
            (corner, index, arr) =>
                arr.findIndex(
                    ([r, c]) => r === corner[0] && c === corner[1],
                ) === index,
        );

        // 남은 블록 수 계산
        const remainingBlocks = availablePositions.length;

        // 실제 사용할 꼭지점 개수 결정 (남은 블록이 2개 이상이 되도록)
        let maxCornersAllowed = uniqueCorners.length;
        if (remainingBlocks <= 3) {
            // 남은 블록이 3개 이하면 최대 2개 꼭지점만 사용 (1개 남기지 않기 위해)
            maxCornersAllowed = Math.min(2, uniqueCorners.length);
        }

        const numCornersToUse = Math.min(
            maxCornersAllowed,
            Math.max(
                2,
                Math.floor(Math.random() * (maxCornersAllowed - 1)) + 2,
            ),
        );

        // 꼭지점이 2개 미만이면 스킵
        if (uniqueCorners.length < 2) {
            continue;
        }

        // 랜덤하게 꼭지점 선택
        const selectedCorners = uniqueCorners
            .sort(() => Math.random() - 0.5)
            .slice(0, numCornersToUse);

        // 선택된 꼭지점에 랜덤 값 할당 (합이 goalSum이 되도록)
        const cornerValues: number[] = [];
        let remainingSum = role.goalSum;

        for (let i = 0; i < selectedCorners.length - 1; i++) {
            const maxVal = Math.min(
                9,
                remainingSum - (selectedCorners.length - 1 - i),
            );
            const minVal = Math.max(
                1,
                remainingSum - 9 * (selectedCorners.length - 1 - i),
            );
            const value =
                Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
            cornerValues.push(value);
            remainingSum -= value;
        }
        cornerValues.push(remainingSum); // 마지막 꼭지점

        // 값이 유효하지 않으면 건너뛰기
        if (cornerValues.some((val) => val < 1 || val > 9)) {
            continue;
        }

        // 선택된 꼭지점에 값 할당
        selectedCorners.forEach(([row, col], index) => {
            values[row][col] = cornerValues[index];
        });

        // 숫자가 들어간 꼭지점만 사용됨으로 표시
        selectedCorners.forEach(([row, col]) => {
            used[row][col] = true;
        });
    }

    // 3. 마지막 남은 블록들 처리 (무조건 2개 이상씩 묶어서 처리)
    const finalRemaining: [number, number][] = [];
    for (let i = 0; i < role.height; i++) {
        for (let j = 0; j < role.width; j++) {
            if (!used[i][j]) {
                finalRemaining.push([i, j]);
            }
        }
    }

    // 남은 블록들을 2개씩 묶어서 처리
    for (let i = 0; i < finalRemaining.length; i += 2) {
        if (i + 1 < finalRemaining.length) {
            // 2개 블록의 합이 goalSum이 되도록 설정
            const [pos1, pos2] = [finalRemaining[i], finalRemaining[i + 1]];
            const val1 = Math.floor(Math.random() * (role.goalSum - 1)) + 1;
            const val2 = role.goalSum - val1;

            if (val2 >= 1 && val2 <= 9) {
                values[pos1[0]][pos1[1]] = val1;
                values[pos2[0]][pos2[1]] = val2;
            } else {
                // 값이 범위를 벗어나면 적절히 조정
                values[pos1[0]][pos1[1]] = Math.min(role.goalSum, 9);
                values[pos2[0]][pos2[1]] = Math.max(role.goalSum - 9, 1);
            }
        } else {
            // 마지막에 1개가 남은 경우, 이전 쌍과 합쳐서 3개 블록으로 만들기
            if (i > 0) {
                const lastPos = finalRemaining[i];
                const prevPos1 = finalRemaining[i - 2];
                const prevPos2 = finalRemaining[i - 1];

                // 3개 블록의 합이 goalSum이 되도록 재분배
                const val1 = Math.floor(Math.random() * 7) + 1; // 1-7
                const val2 =
                    Math.floor(Math.random() * (role.goalSum - val1 - 1)) + 1;
                const val3 = role.goalSum - val1 - val2;

                if (val3 >= 1 && val3 <= 9) {
                    values[prevPos1[0]][prevPos1[1]] = val1;
                    values[prevPos2[0]][prevPos2[1]] = val2;
                    values[lastPos[0]][lastPos[1]] = val3;
                } else {
                    // 재분배가 안되면 기본값으로
                    values[prevPos1[0]][prevPos1[1]] = Math.floor(
                        role.goalSum / 3,
                    );
                    values[prevPos2[0]][prevPos2[1]] = Math.floor(
                        role.goalSum / 3,
                    );
                    values[lastPos[0]][lastPos[1]] =
                        role.goalSum - 2 * Math.floor(role.goalSum / 3);
                }
            }
        }
    }

    return values;
}

function makeBlocks(): Block[][] {
    const blocks: Block[][] = [];
    const values = makeBlockValues();

    for (let i = 0; i < role.height; i++) {
        const row: Block[] = [];
        for (let j = 0; j < role.width; j++) {
            row.push({
                x: j,
                y: i,
                value: values[i][j] === 0 ? null : values[i][j],
            });
        }
        blocks.push(row);
    }
    return blocks;
}

export function setReady(): Board {
    board.blocks = makeBlocks();
    board.achievedSum = 0;
    board.status = 'ready';

    return board;
}
