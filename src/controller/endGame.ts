import { board } from '@/modules/engine/status';
import { uiEntity } from '@/modules/canvas/entitie/uiEntity';
import { reset } from './reset';

export function endGame() {
    board.status = 'completed';
    reset();
    uiEntity.refresh();
}
