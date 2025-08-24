import { rootEntity } from '../entitie/rootEntity';
import { background, game, ui } from '../layers';

export function refreshCanvas() {
    rootEntity.refresh();
}

export async function initCanvas(element: HTMLElement) {
    for (const layer of [background, game, ui]) {
        layer.setAppElement(element);
        element.appendChild(layer.canvas);
    }
    refreshCanvas();
}
