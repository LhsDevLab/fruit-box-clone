import { clickEnd, clickStart, getMousePos } from '../mouse';
import { ui } from '@/modules/canvas/layers';
import { mouseInfo } from '../mouse';
import { getAppleCoordsInRect } from '@/modules/canvas/controller/game';
import { selectedBlock } from '../status';
import { updateApple } from '@/controller/updateApple';
import { clearSelected } from '../mouse';
import { gameEntity } from '@/modules/canvas/entitie/gameEntity';

function onMouseMove(evt: MouseEvent) {
    const mousePos = getMousePos(ui.canvas, evt);
    mouseInfo.currentX = mousePos.x;
    mouseInfo.currentY = mousePos.y;
    if (mouseInfo.startX !== null && mouseInfo.startY !== null) {
        clearSelected();
        const selected = getAppleCoordsInRect(
            mouseInfo.startX,
            mouseInfo.startY,
            mouseInfo.currentX,
            mouseInfo.currentY,
        );
        for (const coord of selected) {
            const key = `${coord.x},${coord.y}`;
            selectedBlock.add(key);
        }
        for (const { x, y } of selected) {
            updateApple(x, y, undefined);
        }
        gameEntity.refresh();
    }
}

export function initEvents() {
    ui.canvas.addEventListener('mousemove', onMouseMove);
    ui.canvas.addEventListener('mousedown', () => {
        clickStart();
    });
    ui.canvas.addEventListener('mouseup', () => {
        clickEnd();
        gameEntity.refresh();
    });
}
