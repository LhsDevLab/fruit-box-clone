import type { CanvasEntity } from '@/types';
import { background } from '../layers';
import { drawRectFill, clearCanvas, drawNeonRectLine } from '../tools';

export const backgroundEntity: CanvasEntity = {
    x: 25,
    y: 25,
    draw: (x, y) => {
        const ctx = background.getCtx();
        clearCanvas(background);
        drawRectFill(
            background,
            x,
            y,
            ctx.canvas.width - 50,
            ctx.canvas.height - 50,
            '#15071a',
            35,
        );
        drawNeonRectLine(
            background,
            x,
            y,
            ctx.canvas.width - 50,
            ctx.canvas.height - 50,
            'rgba(255, 217, 103, 0.7)',
            35,
            [5, 3],
        );
    },
    childrens: [],
};
