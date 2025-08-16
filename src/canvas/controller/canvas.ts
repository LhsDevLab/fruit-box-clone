import { rootEntity } from '../entitie/entite';
import { background, game, ui } from '../layers';
import { CanvasEntityController } from '@/types';

export function refreshCanvas() {
    CanvasEntityController.refresh(rootEntity, rootEntity.x, rootEntity.y);
}

export async function initCanvas(element: HTMLElement, window: Window) {
    for (const layer of [background, game, ui]) {
        layer.setAppElement(element);
        element.appendChild(layer.canvas);
    }
}
