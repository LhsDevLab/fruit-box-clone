import { updateApple } from '@/controller/updateApple';
import {
    selectedBlock,
    board,
    role,
    checkAllBlocksCleared,
} from '@/modules/engine/status';
import { uiEntity } from '@/modules/canvas/entitie/uiEntity';
import { endGame } from './endGame';

export function checkList(): boolean {
    if (board.status !== 'in-progress') return false;
    // 선택된 블록들의 합 계산
    let sum = 0;
    selectedBlock.forEach(({ x, y }) => {
        const block = board.blocks[y][x];
        if (block.value !== null) {
            sum += block.value;
        }
    });
    // 목표 금액과 일치하면 처리
    if (sum === role.goalSum) {
        board.achievedSum += selectedBlock.length;
        selectedBlock.forEach(({ x, y }) => {
            updateApple(x, y, null);
        });
        uiEntity.refresh();
        if (checkAllBlocksCleared()) {
            endGame();
        }
        return true;
    }

    return false;
}
