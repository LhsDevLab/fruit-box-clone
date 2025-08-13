import { initCanvas } from '@canvas';
import { start } from '@engine';
import { refreshCanvas } from '@canvas';
import './style.css';

async function main() {
    try {
        const appElement = document.querySelector<HTMLDivElement>('#app')!;

        // 이미지 로딩 완료 후 캔버스 초기화
        await initCanvas(appElement, window);

        // 게임 준비 완료
        start();

        // 캔버스 리프레시
        refreshCanvas();

        console.log('Game initialized successfully');
    } catch (error) {
        console.error('Failed to initialize game:', error);
    }
}

// 앱 시작
main();
