import { fillApples } from '@/modules/canvas/controller/game';
import { board, role, setReady } from '@/modules/engine';

export function reset() {
    setReady();
    fillApples(role, board);
}
