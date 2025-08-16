import type { CanvasEntity } from '@/types';
import { clearCanvas } from '../tools';
import { ui } from '../layers';

export const uiEntity: CanvasEntity = {
    x: 10,
    y: 10,
    draw: (x, y) => {
        clearCanvas(ui);
    },
    childrens: [],
};
