import { initCanvas } from '@canvas';
import { setReady } from './engine';
import './style.css';

const appElement = document.querySelector<HTMLDivElement>('#app')!;
initCanvas(appElement, window);
setReady();
