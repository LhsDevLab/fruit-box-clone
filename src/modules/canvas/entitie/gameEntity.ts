import * as tools from '../tools';
import { game } from '@/modules/canvas/layers';
import { CanvasEntity } from '@/types/canvas';
import type { Block } from '@/types/engine';
import { role, selectedBlock } from '@/modules/engine';
import { clearCanvas } from '../tools';

export function drawApple(
    block: Block,
    x: number,
    y: number,
    appleSize: number,
) {
    tools.clearRectFill(game, x, y, appleSize, appleSize);
    if (block.value === null) return;
    if (selectedBlock.has(`${block.x},${block.y}`)) {
        tools.drawRectFill(
            game,
            x,
            y,
            appleSize,
            appleSize,
            'rgba(255, 217, 103, 0.5)',
            0,
        );
        tools.drawApple(
            game,
            x,
            y,
            appleSize,
            appleSize,
            1.0,
            block.value,
            'rgba(0, 0, 0, 1)',
        );
    } else {
        tools.drawApple(game, x, y, appleSize, appleSize, 1.0, block.value);
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

export const applesEntity: CanvasEntity = new CanvasEntity(0, 0, () => {}, []);

export const gameEntity: CanvasEntity = new CanvasEntity(
    0,
    0,
    function (x, y) {
        clearCanvas(game);
        drawGrid(x, y);
    },
    [applesEntity],
);
