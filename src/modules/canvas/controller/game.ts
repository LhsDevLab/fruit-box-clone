import { CanvasEntity, CanvasEntityChildAdder } from '@/types/canvas';
import { applesEntity, drawApple } from '../entitie/gameEntity';
import { game } from '../layers';
import { board, role } from '@/modules/engine/status';
import type { Role, Board } from '@/types/engine';

function getCellSizeInfo(role: Role): {
    startX: number;
    startY: number;
    cellSize: number;
    appleSize: number;
} {
    // 그리드 크기 계산 (캔버스 크기에 맞춰 조정)
    const canvasWidth = game.canvas.width;
    const canvasHeight = game.canvas.height;

    // 그리드 셀 크기 (여백 포함)
    const gridPadding = 40; // 전체 여백
    const cellSize = Math.min(
        (canvasWidth - gridPadding * 2) / role.width,
        (canvasHeight - gridPadding * 2) / role.height,
    );

    // 그리드 시작 위치 (중앙 정렬)
    const gridWidth = cellSize * role.width;
    const gridHeight = cellSize * role.height;
    const startX = (canvasWidth - gridWidth) / 2;
    const startY = (canvasHeight - gridHeight) / 2;

    const appleSize = cellSize;

    return {
        startX,
        startY,
        cellSize,
        appleSize,
    };
}

export function fillApples(role: Role, board: Board) {
    const { startX, startY, cellSize, appleSize } = getCellSizeInfo(role);
    applesEntity.childrens = [];
    board.blocks.forEach((row, rowIndex) => {
        const appleRow: CanvasEntity = new CanvasEntity(
            startX,
            startY + rowIndex * cellSize,
            function () {},
            [],
        );
        CanvasEntityChildAdder.addChild(applesEntity, appleRow);
        row.forEach((block, colIndex) => {
            CanvasEntityChildAdder.addChild(
                appleRow,
                new CanvasEntity(
                    colIndex * cellSize,
                    0,
                    (x: number, y: number) => {
                        drawApple(block, x, y, appleSize);
                    },
                    [],
                ),
            );
        });
    });
}
export function getAppleCoordsInRect(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
): { x: number; y: number }[] {
    const {
        startX: gridStartX,
        startY: gridStartY,
        cellSize,
    } = getCellSizeInfo(role);

    const coords: { x: number; y: number }[] = [];

    board.blocks.forEach((row) => {
        row.forEach((block) => {
            const appleCenterX = gridStartX + block.x * cellSize + cellSize / 2;
            const appleCenterY = gridStartY + block.y * cellSize + cellSize / 2;
            // 드래그 영역에 포함되는지 체크
            if (
                appleCenterX >= Math.min(startX, endX) &&
                appleCenterX <= Math.max(startX, endX) &&
                appleCenterY >= Math.min(startY, endY) &&
                appleCenterY <= Math.max(startY, endY)
            ) {
                coords.push({ x: block.x, y: block.y });
            }
        });
    });

    return coords;
}
