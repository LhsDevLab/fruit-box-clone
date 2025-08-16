import { load } from '@/controller';
import './style.css';

async function main() {
    try {
        const appElement = document.querySelector<HTMLDivElement>('#app')!;

        // 게임 준비 완료
        await load(appElement, window);
    } catch (error) {
        console.error('Failed to initialize game:', error);
    }
}

// 앱 시작
main();
