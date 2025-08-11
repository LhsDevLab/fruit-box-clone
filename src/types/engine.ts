export type Value = number | null;

export interface Block {
    x: number;
    y: number;
    value: Value;
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
