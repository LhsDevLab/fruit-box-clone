import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@types': resolve(__dirname, './src/types/index.ts'),
            '@engine': resolve(__dirname, './src/engine/index.ts'),
            '@canvas': resolve(__dirname, './src/canvas/index.ts'),
        },
    },
});
