import type { Role, Board } from '@/types/engine';
import { uiEntity } from '../canvas/entitie/uiEntity';
import { endGame } from '@/controller/endGame';

export const role: Role = {
    width: 17,
    height: 10,
    goalSum: 10,
    maxTime: 120,
};

export const board: Board = {
    blocks: [],
    achievedSum: 0,
    status: 'ready',
    remainTime: 0,
};

export let selectedBlock: { x: number; y: number }[] = [];

export function setSelected(coods: { x: number; y: number }[]) {
    selectedBlock = coods;
}

let timer: NodeJS.Timeout | null = null;

export function resetTimer() {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(() => {
        board.remainTime -= 1;
        uiEntity.refresh();
        if (board.remainTime <= 0) {
            if (timer) {
                endGame();
                clearInterval(timer);
            }
        }
    }, 1000);
}
