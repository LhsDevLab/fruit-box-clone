import * as tools from '../tools';
import { game } from '@/canvas/layers';
import type { Block, CanvasEntity } from '@/types';
import { role } from '@/engine';

export function drawApple(
    block: Block,
    x: number,
    y: number,
    appleSize: number,
) {
    tools.clearRectFill(game, x, y, appleSize, appleSize);
    if (block.value !== null) {
        tools.drawApple(game, x, y, appleSize, appleSize, 1.0, block.value);
    }
    if (block.status === 'highlighted') {
        tools.drawRectFill(
            game,
            x,
            y,
            appleSize,
            appleSize,
            'rgba(255, 217, 103, 0.1)',
            0,
        );
    }
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
        tools.drawRectLine(game, lineX, startY, 1, gridHeight, color, 0, 1);
    }
    for (let j = 1; j < role.height; j++) {
        const lineY = startY + j * cellSize;
        tools.drawRectLine(game, startX, lineY, gridWidth, 1, color, 0, 1);
    }
}

export const applesEntity: CanvasEntity = {
    x: 0,
    y: 0,
    draw: (x, y) => {},
    childrens: [],
};

export const gameEntity: CanvasEntity = {
    x: 0,
    y: 0,
    draw: (x, y) => {
        tools.clearCanvas(game);
        drawGrid(x, y);
    },
    childrens: [applesEntity],
};
