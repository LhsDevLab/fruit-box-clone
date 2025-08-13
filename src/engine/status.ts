import type { Role, Board, Block } from '@types';

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

// 보드 초기화 함수
export function initializeBoard() {
    board.blocks = [];

    for (let row = 0; row < role.height; row++) {
        const boardRow: Block[] = [];
        for (let col = 0; col < role.width; col++) {
            boardRow.push({
                x: col,
                y: row,
                value: null,
            });
        }
        board.blocks.push(boardRow);
    }

    board.status = 'in-progress';
}
