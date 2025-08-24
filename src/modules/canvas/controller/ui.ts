import { buttonCoord, buttonSize } from '../entitie/uiEntity';

export function isButtonTouched(mouseX: number, mouseY: number): boolean {
    const [x, y] = buttonCoord;
    const [width, height] = buttonSize;
    return (
        mouseX >= x - width / 2 &&
        mouseX <= x + width / 2 &&
        mouseY >= y - height / 2 &&
        mouseY <= y + height / 2
    );
}
