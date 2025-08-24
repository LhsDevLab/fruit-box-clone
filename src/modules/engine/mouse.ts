import type { MouseInfo } from '@/types/mouse';
import { setSelected } from './status';
import { checkList } from '@/controller/checkList';
import { board } from './status';
import { isButtonTouched } from '../canvas/controller/ui';
import { reset } from '@/controller/reset';
import { start } from '@/controller/start';

export const mouseInfo: MouseInfo = {
    startX: null,
    startY: null,
    currentX: null,
    currentY: null,
};

export function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY,
    };
}

export function clickStart() {
    mouseInfo.startX = mouseInfo.currentX;
    mouseInfo.startY = mouseInfo.currentY;
}

function buttonOnClicked() {
    if (board.status === 'ready') start();
    else if (board.status === 'in-progress') reset();
    else if (board.status === 'completed') start();
}
export function clickEnd() {
    if (
        isButtonTouched(mouseInfo.currentX!!, mouseInfo.currentY!!) &&
        isButtonTouched(mouseInfo.startX!!, mouseInfo.startY!!)
    ) {
        buttonOnClicked();
    }
    mouseInfo.startX = null;
    mouseInfo.startY = null;
    checkList();
    setSelected([]);
}
