import { imageLoader } from '../imageLoader';

export function getImage(imageName: string): HTMLImageElement | null {
    return imageLoader.getImage(imageName);
}
