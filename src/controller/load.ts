import { initCanvas, refreshCanvas } from '@/canvas';
import { setReady } from '@/engine/controller/board';
import { imageLoader, GAME_IMAGES } from '@assets';

export async function load(element: HTMLElement, window: Window) {
    // 이미지 로드
    await imageLoader.loadImages(GAME_IMAGES);

    // 엔진 세팅
    setReady();

    // 캔버스 초기화
    initCanvas(element, window);

    // 캔버스 리프레시
    refreshCanvas();
}
