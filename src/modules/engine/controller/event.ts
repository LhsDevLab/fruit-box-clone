import { clickEnd, clickStart, getMousePos } from '../mouse';
import { ui } from '@/modules/canvas/layers';
import { mouseInfo } from '../mouse';
import { getAppleCoordsInRect } from '@/modules/canvas/controller/game';
import { selectedBlock } from '../status';
import { updateApple } from '@/controller/updateApple';

function onMouseMove(evt: MouseEvent) {
    const mousePos = getMousePos(ui.canvas, evt);
    mouseInfo.currentX = mousePos.x;
    mouseInfo.currentY = mousePos.y;
    if (mouseInfo.startX !== null && mouseInfo.startY !== null) {
        // const selected = getAppleCoordsInRect(
        //     mouseInfo.startX,
        //     mouseInfo.startY,
        //     mouseInfo.currentX,
        //     mouseInfo.currentY,
        // );
        const selected = [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
        ];
        for (const coord of selected) {
            const key = `${coord.x},${coord.y}`;
            selectedBlock.add(key);
        }
        for (const { x, y } of selected) {
            updateApple(x, y, undefined);
        }
    }
}

export function initEvents() {
    ui.canvas.addEventListener('mousemove', onMouseMove);
    ui.canvas.addEventListener('mousedown', () => {
        clickStart();
    });
    ui.canvas.addEventListener('mouseup', () => {
        clickEnd();
    });
}
