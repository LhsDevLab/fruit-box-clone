import { drawRect } from '@/canvas/tools';
import { game } from '@/canvas/layers';
import type { CanvasEntity } from '@/types';

export const gameEntity: CanvasEntity = {
    x: 10,
    y: 10,
    draw: (x, y) => {
        drawRect(game, x, y, 100, 100, 'red');
    },
    childrens: [],
};
