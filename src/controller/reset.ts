import { fillApples } from '@/modules/canvas/controller/game';
import { board, role } from '@/modules/engine/status';
import { setReady } from '@/modules/engine/controller/board';
import { toRobby } from '@/modules/canvas/entitie/uiEntity';

export function reset() {
    setReady();
    fillApples(role, board);
    toRobby();
}
