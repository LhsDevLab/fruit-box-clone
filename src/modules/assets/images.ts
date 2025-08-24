// 게임에서 사용할 모든 이미지들 정의
export const GAME_IMAGES = {
    apple: '/apple.png',
} as const;

// 이미지 이름 타입
export type ImageName = keyof typeof GAME_IMAGES;
