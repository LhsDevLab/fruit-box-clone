import { clearCanvas } from '../tools';
import { game } from '@/canvas/layers';
import type { CanvasEntity } from '@/types';
import { drawNeonApple } from '../tools';

export const gameEntity: CanvasEntity = {
    x: 0,
    y: 0,
    draw: (x, y) => {
        clearCanvas(game);
        drawNeonApple(game, x, y, 250, 250);
    },
    childrens: [],
};
