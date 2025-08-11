export class Layer {
    canvas: HTMLCanvasElement = document.createElement('canvas');
    appElement: HTMLElement | null = null;

    setAppElement(element: HTMLElement) {
        this.appElement = element;
    }

    getCtx(): CanvasRenderingContext2D {
        const ctx = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Failed to get canvas context');
        }
        return ctx;
    }

    constructor(
        width: number = 2000,
        height: number = 2000,
        depth: number = 0,
    ) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.zIndex = depth.toString();

        // 기본 스타일 설정
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
    }
}
