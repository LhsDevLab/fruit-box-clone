import { applesEntity } from '@/modules/canvas/entitie/gameEntity';
import { board } from '@/modules/engine';
import type { CanvasEntity } from '@/types/canvas';
import type { Block } from '@/types/engine';

export function updateApple(
    x: number,
    y: number,
    value: number | null | undefined,
) {
    const canvasApple: CanvasEntity = applesEntity.childrens[y].childrens[x];
    const blockApple: Block = board.blocks[y][x];
    // Update the board apple
    if (value !== undefined) {
        blockApple.value = value;
    }

    // Update the canvas apple
    canvasApple.refresh();
}
