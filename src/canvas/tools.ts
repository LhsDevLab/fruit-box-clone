import type { Layer } from '@/types';
import { imageLoader } from '@assets';

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

export function drawRectFill(
    layer: Layer,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    radius: number = 0,
) {
    const ctx = layer.getCtx();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}

export function drawRectLine(
    layer: Layer,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    radius: number = 0,
    lineWidth: number = 2,
) {
    const ctx = layer.getCtx();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    // 선의 연결점과 끝점 스타일 설정으로 각도 유지
    ctx.lineJoin = 'miter'; // 모서리를 뾰족하게 유지
    ctx.lineCap = 'round'; // 선의 끝을 정사각형으로
    ctx.miterLimit = 10; // miter 길이 제한 (선택적)

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.stroke();
}

export function drawApple(
    layer: Layer,
    x: number,
    y: number,
    width: number = 50,
    height: number = 50,
    alpha: number = 1.0, // 투명도 추가 (0.0 ~ 1.0)
    value?: number | null, // 블록의 숫자 값
) {
    const ctx = layer.getCtx();
    const appleImg = imageLoader.getImage('apple');

    if (!appleImg) {
        console.warn('Apple image not loaded yet');
        return;
    }

    const originalAlpha = ctx.globalAlpha;
    ctx.globalAlpha = alpha;

    // 사과 이미지 그리기
    ctx.drawImage(appleImg, x, y, width, height);

    // 숫자가 있으면 사과 위에 텍스트 그리기
    if (value !== null && value !== undefined) {
        const fontSize = Math.min(width, height) * 0.35;
        const color = 'rgba(255, 217, 103, 1)';
        const textX = x + width / 2;
        const textY = y + height * (3 / 5);

        // 텍스트에 그림자 효과 추가 (가독성 향상)
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        drawText(
            layer,
            value.toString(),
            textX,
            textY,
            fontSize,
            color,
            'Arial',
        );

        // 그림자 효과 초기화
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    ctx.globalAlpha = originalAlpha;
}

export function drawNeonApple(
    layer: Layer,
    x: number,
    y: number,
    width: number = 50,
    height: number = 50,
) {
    const neonLayers = [
        { thickness: 15, alpha: 0.2 },
        { thickness: 13, alpha: 0.2 },
        { thickness: 11, alpha: 0.2 },
        { thickness: 10, alpha: 0.5 },
    ];

    neonLayers.forEach(({ thickness, alpha }) => {
        const expandedWidth = width + thickness * 2;
        const expandedHeight = height + thickness * 2;

        const adjustedX = x - thickness;
        const adjustedY = y - thickness;

        drawApple(
            layer,
            adjustedX,
            adjustedY,
            expandedWidth,
            expandedHeight,
            alpha,
        );
    });
}

export function drawNeonRectLine(
    layer: Layer,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    radius: number = 0,
    neonWidth: number[],
) {
    for (const lineWidth of neonWidth) {
        drawRectLine(layer, x, y, width, height, color, radius, lineWidth);
    }
}

export function drawText(
    layer: Layer,
    text: string,
    x: number,
    y: number,
    fontSize: number = 20,
    color: string = 'white',
    fontFamily: string = 'Arial',
    textAlign: CanvasTextAlign = 'center',
    textBaseline: CanvasTextBaseline = 'middle',
) {
    const ctx = layer.getCtx();
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillText(text, x, y);
}
