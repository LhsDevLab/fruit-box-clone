import { CanvasEntity, CanvasEntityChildAdder } from '@/types/canvas';
import {
    clearRectFill,
    drawText,
    drawRectFill,
    drawNeonRectLine,
} from '../tools';
import { ui } from '../layers';
import { board } from '@/modules/engine/status';

const scoreEntity: CanvasEntity = new CanvasEntity(1750, 100, (x, y) => {
    const [width, height] = [100, 50];
    // 점수판 그리기
    drawText(ui, 'SCORE', x + width / 2, y + height / 2, 50, 'white', 'Arial');
    drawText(
        ui,
        board.achievedSum.toString().padStart(3, '0'),
        x + width / 2,
        y + height / 2 + height,
        50,
        'white',
        'Arial',
    );
});

const timerEntity: CanvasEntity = new CanvasEntity(1000, 100, (x, y) => {
    const [width, height] = [50, 50];
    drawText(
        ui,
        board.remainTime.toString().padStart(3, '0'),
        x + width / 2,
        y + height / 2 + height,
        150,
        'white',
        'Arial',
    );
});

export const buttonCoord = [1000, 1750];
export const buttonSize = [300, 200];
let isTouched: boolean = false;
export function setTouched(value: boolean) {
    if (value !== isTouched) {
        isTouched = value;
        uiEntity.refresh();
    }
}
const startButtonEntity: CanvasEntity = new CanvasEntity(
    buttonCoord[0] - buttonSize[0],
    buttonCoord[1] - buttonSize[1],
    (x, y) => {
        const [width, height] = buttonSize;
        if (isTouched) {
            drawRectFill(
                ui,
                x + width / 2,
                y + height / 2,
                width - 2,
                height - 2,
                'rgba(255, 217, 103, 0.5)',
                25,
            );
            drawText(
                ui,
                'START',
                x + width,
                y + height,
                65,
                'rgba(0, 0, 0, 1)',
                'Arial',
            );
        } else {
            drawText(ui, 'START', x + width, y + height, 65, 'white', 'Arial');
        }
        drawNeonRectLine(
            ui,
            x + width / 2,
            y + height / 2,
            width,
            height,
            'rgba(255, 217, 103, 0.7)',
            35,
            [5, 3],
        );
    },
);
const resetButtonEntity: CanvasEntity = new CanvasEntity(
    buttonCoord[0] - buttonSize[0],
    buttonCoord[1] - buttonSize[1],
    (x, y) => {
        const [width, height] = buttonSize;
        if (isTouched) {
            drawRectFill(
                ui,
                x + width / 2,
                y + height / 2,
                width - 2,
                height - 2,
                'rgba(255, 217, 103, 0.5)',
                25,
            );
            drawText(
                ui,
                'RESET',
                x + width,
                y + height,
                65,
                'rgba(0, 0, 0, 1)',
                'Arial',
            );
        } else {
            drawText(ui, 'RESET', x + width, y + height, 65, 'white', 'Arial');
        }
        drawNeonRectLine(
            ui,
            x + width / 2,
            y + height / 2,
            width,
            height,
            'rgba(255, 217, 103, 0.7)',
            35,
            [5, 3],
        );
    },
);

const titleEntity: CanvasEntity = new CanvasEntity(1000, 1000, (x, y) => {
    drawText(ui, 'FRUIT BOX CLONE', x, y, 100, 'white', 'Arial');
    if (board.achievedSum !== 0) {
        drawText(
            ui,
            `LAST: ${board.achievedSum.toString().padStart(3, '0')}`,
            x,
            y + 100,
            50,
            'white',
            'Arial',
        );
    }
});

const robbyEntity: CanvasEntity = new CanvasEntity(
    0,
    0,
    (x, y) => {
        drawRectFill(
            ui,
            x + 25,
            y + 25,
            ui.canvas.width - 50,
            ui.canvas.height - 50,
            `rgba(21, 7, 26, 1)`,
            35,
        );
    },
    [startButtonEntity, titleEntity],
);

const gameUiEntity: CanvasEntity = new CanvasEntity(
    0,
    0,
    (x, y) => {
        clearRectFill(ui, x, y, ui.canvas.width, ui.canvas.height);
        drawNeonRectLine(
            ui,
            x + 25,
            y + 25,
            ui.canvas.width - 50,
            ui.canvas.height - 50,
            'rgba(255, 217, 103, 0.7)',
            35,
            [5, 3],
        );
    },
    [scoreEntity, timerEntity, resetButtonEntity],
);

export const uiEntity: CanvasEntity = new CanvasEntity(
    0,
    0,
    (x, y) => {
        clearRectFill(ui, x, y, ui.canvas.width, ui.canvas.height);
        drawNeonRectLine(
            ui,
            x + 25,
            y + 25,
            ui.canvas.width - 50,
            ui.canvas.height - 50,
            'rgba(255, 217, 103, 0.7)',
            35,
            [5, 3],
        );
    },
    [],
);

export function toRobby() {
    CanvasEntityChildAdder.removeAllChildren(uiEntity);
    CanvasEntityChildAdder.addChild(uiEntity, robbyEntity);
    uiEntity.refresh();
}
export function toGame() {
    CanvasEntityChildAdder.removeAllChildren(uiEntity);
    CanvasEntityChildAdder.addChild(uiEntity, gameUiEntity);
    uiEntity.refresh();
}
