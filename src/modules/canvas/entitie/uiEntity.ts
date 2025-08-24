import { CanvasEntity } from '@/types/canvas';
import { clearCanvas } from '../tools';
import { ui } from '../layers';

export const uiEntity: CanvasEntity = new CanvasEntity(
    10,
    10,
    () => {
        clearCanvas(ui);
    },
    [],
);
