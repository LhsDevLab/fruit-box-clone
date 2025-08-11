import type { Layer } from '@/types';

export function drawLine(
    layer: Layer,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
) {
    const ctx = layer.getCtx();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

export function clearCanvas(layer: Layer) {
    const ctx = layer.getCtx();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function drawRect(
    layer: Layer,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
) {
    const ctx = layer.getCtx();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}
