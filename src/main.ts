import { load } from '@/controller/load';
import './style.css';
import { reset } from './controller/reset';

async function main() {
    try {
        const appElement = document.querySelector<HTMLDivElement>('#app')!;

        await load(appElement, window);
    } catch (error) {
        console.error('Failed to initialize game:', error);
    }
}

main();
reset();
