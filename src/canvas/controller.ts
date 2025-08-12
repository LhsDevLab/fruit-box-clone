import { background, game, ui } from './layers';
import { backgroundEntity } from './entities/backgroundEntity';
import { gameEntity } from './entities/gameEntity';
import { CanvasEntityController } from '@/types';
import type { CanvasEntity } from '@/types';
import { uiEntity } from './entities/uiEntity';
import { imageLoader, GAME_IMAGES } from '@assets';

export const rootEntity: CanvasEntity = {
    x: 0,
    y: 0,
    draw: () => {},
    childrens: [backgroundEntity, gameEntity, uiEntity],
};

function refreshCanvas() {
    CanvasEntityController.refresh(rootEntity, rootEntity.x, rootEntity.y);
}

export async function initCanvas(element: HTMLElement, window: Window) {
    if (!element) {
        throw new Error('Element is required to initialize the canvas');
    }

    try {
        console.log('Loading images...');
        await imageLoader.loadImages(GAME_IMAGES);
        console.log('All images loaded successfully');

        for (const layer of [background, game, ui]) {
            layer.setAppElement(element);
            element.appendChild(layer.canvas);
        }

        refreshCanvas();

        window.addEventListener('resize', () => refreshCanvas());
    } catch (error) {
        console.error('Failed to initialize canvas:', error);
        throw error;
    }
}
