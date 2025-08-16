import { backgroundEntity } from './backgroundEntity';
import { gameEntity, apples } from './gameEntity';
import { uiEntity } from './uiEntity';
import type { CanvasEntity } from '@/types';

export const rootEntity: CanvasEntity = {
    x: 0,
    y: 0,
    draw: () => {},
    childrens: [backgroundEntity, gameEntity, uiEntity],
};

export * from './backgroundEntity';
export * from './gameEntity';
export * from './uiEntity';
