export interface Block {
    x: number;
    y: number;
    value: number | null;
    status: 'normal' | 'highlighted';
}

export interface Role {
    width: number;
    height: number;
    goalSum: number;
}

export interface Board {
    blocks: Block[][];
    achievedSum: number;
    status: 'ready' | 'in-progress' | 'completed';
}
