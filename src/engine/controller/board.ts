import { role, board } from '@engine';
import type { Board, Block } from '@types';

function makeBlocks(): Block[][] {
    const blocks: Block[][] = [];
    for (let i = 0; i < role.height; i++) {
        const row: Block[] = [];
        for (let j = 0; j < role.width; j++) {
            row.push({ x: j, y: i, value: 5 });
        }
        blocks.push(row);
    }
    return blocks;
}

export function setReady(): Board {
    board.blocks = makeBlocks();
    board.achievedSum = 0;
    board.status = 'ready';

    return board;
}

export function setInProgress(): Board {
    board.status = 'in-progress';
    board.blocks = makeBlocks();
    return board;
}
