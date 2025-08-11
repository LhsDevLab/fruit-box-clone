import type { CanvasEntity } from '@/types';
import { background } from '../layers';
import { drawRect } from '../tools';

export const backgroundEntity: CanvasEntity = {
    x: 0,
    y: 0,
    draw: () => {
        const ctx = background.getCtx();
        drawRect(
            background,
            0,
            0,
            ctx.canvas.width,
            ctx.canvas.height,
            'lightblue',
        );
    },
    childrens: [],
};
