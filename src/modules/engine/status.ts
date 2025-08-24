import type { Role, Board } from '@/types/engine';

export const role: Role = {
    width: 17,
    height: 10,
    goalSum: 10,
};

export const board: Board = {
    blocks: [],
    achievedSum: 0,
    status: 'ready',
};

export let selectedBlock = new Set<string>();
