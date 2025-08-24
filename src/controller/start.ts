import { toGame } from '@/modules/canvas/entitie/uiEntity';
import { setStart } from '@/modules/engine/controller/board';

export function start() {
    setStart();
    toGame();
}
