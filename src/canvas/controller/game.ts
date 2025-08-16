import { applesEntity, drawApple } from '../entitie/gameEntity';
import {
    CanvasEntityController,
    type Block,
    type Board,
    type Role,
} from '@/types';
import { game } from '../layers';

function getCellSizeInfo(role: Role): {
    startX: number;
    startY: number;
    cellSize: number;
    cellPadding: number;
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

    const cellPadding = cellSize * -0.15; // 셀 크기의 10% 여백
    const appleSize = cellSize - cellPadding * 2;

    return {
        startX,
        startY,
        cellSize,
        cellPadding,
        appleSize,
    };
}

export function fillApples(role: Role, board: Board) {
    const { startX, startY, cellSize, cellPadding, appleSize } =
        getCellSizeInfo(role);
    applesEntity.childrens = [];
    board.blocks.forEach((row, rowIndex) => {
        row.forEach((block, colIndex) => {
            applesEntity.childrens.push({
                x: startX + colIndex * cellSize + cellPadding,
                y: startY + rowIndex * cellSize + cellPadding,
                draw(x: number, y: number) {
                    drawApple(block, x, y, appleSize);
                },
                childrens: [],
            });
        });
    });
}

export function refreshTargetApple(idx: number, block: Block) {
    const apple = apples[idx];

    if (apple) {
        apple.block = block;
        CanvasEntityController.refresh(apple);
    }
}
