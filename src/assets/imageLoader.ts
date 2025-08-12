export class ImageLoader {
    private images: Map<string, HTMLImageElement> = new Map();
    private loadPromises: Map<string, Promise<HTMLImageElement>> = new Map();

    /**
     * 이미지를 로드하고 Promise를 반환
     */
    loadImage(name: string, src: string): Promise<HTMLImageElement> {
        // 이미 로드된 이미지라면 바로 반환
        if (this.images.has(name)) {
            return Promise.resolve(this.images.get(name)!);
        }

        // 이미 로딩 중이라면 기존 Promise 반환
        if (this.loadPromises.has(name)) {
            return this.loadPromises.get(name)!;
        }

        // 새로운 이미지 로딩 시작
        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                this.images.set(name, img);
                this.loadPromises.delete(name);
                resolve(img);
            };

            img.onerror = () => {
                this.loadPromises.delete(name);
                reject(new Error(`Failed to load image: ${src}`));
            };

            img.src = src;
        });

        this.loadPromises.set(name, promise);
        return promise;
    }

    /**
     * 여러 이미지를 한 번에 로드
     */
    loadImages(
        imageMap: Record<string, string>,
    ): Promise<Map<string, HTMLImageElement>> {
        const promises = Object.entries(imageMap).map(([name, src]) =>
            this.loadImage(name, src).then((img) => [name, img] as const),
        );

        return Promise.all(promises).then((results) => {
            return new Map(results);
        });
    }

    /**
     * 로드된 이미지 가져오기
     */
    getImage(name: string): HTMLImageElement | null {
        return this.images.get(name) || null;
    }

    /**
     * 모든 이미지가 로드되었는지 확인
     */
    isImageLoaded(name: string): boolean {
        return this.images.has(name);
    }

    /**
     * 로드된 모든 이미지 목록 가져오기
     */
    getAllImages(): Map<string, HTMLImageElement> {
        return new Map(this.images);
    }
}

// 전역 이미지 로더 인스턴스
export const imageLoader = new ImageLoader();
