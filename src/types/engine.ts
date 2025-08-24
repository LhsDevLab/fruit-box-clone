export interface Block {
    x: number;
    y: number;
    value: number | null;
}

export interface Role {
    width: number;
    height: number;
    goalSum: number;
    maxTime: number;
}

export interface Board {
    blocks: Block[][];
    achievedSum: number;
    status: 'ready' | 'in-progress' | 'completed';
    remainTime: number;
}
