import { defineConfig } from 'astro/config'

export default defineConfig({
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import '@/styles/atoms/variables.scss';`
                }
            }
        }
    }
});