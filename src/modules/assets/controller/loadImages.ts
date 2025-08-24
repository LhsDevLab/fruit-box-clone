import { imageLoader } from '../imageLoader';
import { GAME_IMAGES } from '../images';

export async function loadImages(): Promise<Map<string, HTMLImageElement>> {
    return imageLoader.loadImages(GAME_IMAGES);
}
