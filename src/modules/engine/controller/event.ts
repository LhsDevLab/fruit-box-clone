import { clickEnd, clickStart, getMousePos } from '../mouse';
import { ui } from '@/modules/canvas/layers';
import { mouseInfo } from '../mouse';
import { getAppleCoordsInRect } from '@/modules/canvas/controller/game';
import { selectedBlock, setSelected } from '../status';
import { updateApple } from '@/controller/updateApple';
import { gameEntity } from '@/modules/canvas/entitie/gameEntity';
import { isButtonTouched } from '@/modules/canvas/controller/ui';
import { setTouched } from '@/modules/canvas/entitie/uiEntity';

function onMouseMove(evt: MouseEvent) {
    const mousePos = getMousePos(ui.canvas, evt);
    mouseInfo.currentX = mousePos.x;
    mouseInfo.currentY = mousePos.y;
    if (mouseInfo.startX !== null && mouseInfo.startY !== null) {
        setSelected(
            getAppleCoordsInRect(
                mouseInfo.startX,
                mouseInfo.startY,
                mouseInfo.currentX,
                mouseInfo.currentY,
            ),
        );
        for (const { x, y } of selectedBlock) {
            updateApple(x, y, undefined);
        }
        gameEntity.refresh();
    }
    setTouched(isButtonTouched(mousePos.x, mousePos.y));
}

function getTouchPos(canvas: HTMLCanvasElement, touch: Touch) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
    };
}

function onTouchStart(evt: TouchEvent) {
    if (evt.touches.length > 0) {
        const touch = evt.touches[0];
        const pos = getTouchPos(ui.canvas, touch);
        mouseInfo.startX = pos.x;
        mouseInfo.startY = pos.y;
        clickStart();
    }
}

function onTouchMove(evt: TouchEvent) {
    if (evt.touches.length > 0) {
        const touch = evt.touches[0];
        const pos = getTouchPos(ui.canvas, touch);
        mouseInfo.currentX = pos.x;
        mouseInfo.currentY = pos.y;
        if (mouseInfo.startX !== null && mouseInfo.startY !== null) {
            setSelected(
                getAppleCoordsInRect(
                    mouseInfo.startX,
                    mouseInfo.startY,
                    mouseInfo.currentX,
                    mouseInfo.currentY,
                ),
            );
            for (const { x, y } of selectedBlock) {
                updateApple(x, y, undefined);
            }
            gameEntity.refresh();
        }
        setTouched(isButtonTouched(pos.x, pos.y));
    }
}

function onTouchEnd() {
    clickEnd();
    gameEntity.refresh();
}

export function initEvents(window: Window) {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', () => {
        clickStart();
    });
    window.addEventListener('mouseup', () => {
        clickEnd();
        gameEntity.refresh();
    });
    // 터치 이벤트 추가
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
}
