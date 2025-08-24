import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@types': resolve(__dirname, './src/types'),
            '@modules': resolve(__dirname, './src/modules'),
            '@controllers': resolve(__dirname, './src/controllers'),
        },
    },
});
