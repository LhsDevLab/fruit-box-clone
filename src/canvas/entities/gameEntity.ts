import { clearCanvas, drawRectLine, drawApple } from '../tools';
import { game } from '@/canvas/layers';
import type { CanvasEntity } from '@/types';
import { board, role } from '@/engine';

function drawApples(x: number, y: number) {
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
    const startX = x + (canvasWidth - gridWidth) / 2;
    const startY = y + (canvasHeight - gridHeight) / 2;

    board.blocks.forEach((row, rowIndex) => {
        row.forEach((block, colIndex) => {
            if (block.value !== null) {
                // 셀 내부에 사과 그리기 (여백 추가)
                const cellPadding = cellSize * -0.15; // 셀 크기의 10% 여백
                const appleSize = cellSize - cellPadding * 2;

                const blockX = startX + colIndex * cellSize + cellPadding;
                const blockY = startY + rowIndex * cellSize + cellPadding;

                drawApple(
                    game,
                    blockX,
                    blockY,
                    appleSize,
                    appleSize,
                    1.0,
                    block.value,
                );
            }
        });
    });
}

function drawGrid(x: number, y: number) {
    // 그리드 크기 계산 (캔버스 크기에 맞춰 조정)
    const canvasWidth = game.canvas.width;
    const canvasHeight = game.canvas.height;
    const gridPadding = 40; // 전체 여백
    const cellSize = Math.min(
        (canvasWidth - gridPadding * 2) / role.width,
        (canvasHeight - gridPadding * 2) / role.height,
    );
    const gridWidth = cellSize * role.width;
    const gridHeight = cellSize * role.height;
    const startX = x + (canvasWidth - gridWidth) / 2;
    const startY = y + (canvasHeight - gridHeight) / 2;

    const color = 'rgba(255, 255, 255, 0.1)';

    for (let i = 1; i < role.width; i++) {
        const lineX = startX + i * cellSize;
        drawRectLine(game, lineX, startY, 1, gridHeight, color, 0, 1);
    }
    for (let j = 1; j < role.height; j++) {
        const lineY = startY + j * cellSize;
        drawRectLine(game, startX, lineY, gridWidth, 1, color, 0, 1);
    }
}

export const gameEntity: CanvasEntity = {
    x: 0,
    y: 0,
    draw: (x, y) => {
        clearCanvas(game);

        drawApples(x, y);
        drawGrid(x, y);
    },
    childrens: [],
};
