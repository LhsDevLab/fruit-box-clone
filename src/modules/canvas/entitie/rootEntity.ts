import { backgroundEntity } from './backgroundEntity';
import { gameEntity } from './gameEntity';
import { uiEntity } from './uiEntity';
import { CanvasEntity } from '@/types/canvas';

export const rootEntity: CanvasEntity = new CanvasEntity(0, 0, () => {}, [
    backgroundEntity,
    gameEntity,
    uiEntity,
]);
