import { background, game, ui } from './layers';
import { backgroundEntity } from './entities/backgroundEntity';
import { gameEntity } from './entities/gameEntity';
import { CanvasEntityController } from '@/types';

function refreshCanvas() {
    CanvasEntityController.refresh(backgroundEntity, 0, 0);
    CanvasEntityController.refresh(gameEntity, 0, 0);
}

export function initCanvas(element: HTMLElement, window: Window) {
    if (!element) {
        throw new Error('Element is required to initialize the canvas');
    }
    for (const layer of [background, game, ui]) {
        layer.setAppElement(element);
        element.appendChild(layer.canvas);
    }

    refreshCanvas();
    window.addEventListener('resize', () => refreshCanvas());
}
