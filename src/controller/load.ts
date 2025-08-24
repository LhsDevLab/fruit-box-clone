import { initCanvas } from '@/modules/canvas/controller/canvas';
import { loadImages } from '@/modules/assets/controller/loadImages';
import { initEvents } from '@/modules/engine/controller/event';

export async function load(element: HTMLElement, window: Window) {
    // 이미지 로드
    await loadImages();

    // 캔버스 초기화
    initCanvas(element);

    initEvents(window);
}
