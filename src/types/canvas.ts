export interface CanvasEntity {
    x: number;
    y: number;
    draw: (x: number, y: number) => void;
    childrens: CanvasEntity[];
}

export const CanvasEntityController = {
    addChild(entity: CanvasEntity, child: CanvasEntity): void {
        if (!entity.childrens) {
            entity.childrens = [];
        }
        entity.childrens.push(child);
    },
    removeChild(entity: CanvasEntity, child: CanvasEntity): void {
        if (entity.childrens) {
            entity.childrens = entity.childrens.filter((c) => c !== child);
        }
    },
    removeAllChildren(entity: CanvasEntity): void {
        entity.childrens = [];
    },
    refresh(entity: CanvasEntity, baseX: number, baseY: number): void {
        const x = baseX + entity.x;
        const y = baseY + entity.y;
        entity.draw(x, y);
        if (entity.childrens) {
            entity.childrens.forEach((child) => {
                CanvasEntityController.refresh(child, x, y);
            });
        }
    },
};
