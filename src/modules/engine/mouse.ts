import type { MouseInfo } from '@/types/mouse';
import { selectedBlock } from './status';

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

export function clickEnd() {
    mouseInfo.startX = null;
    mouseInfo.startY = null;
    clearSelected();
}

export function clearSelected() {
    selectedBlock.clear();
}
