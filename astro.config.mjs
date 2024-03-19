import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import icon from 'astro-icon'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    integrations: [
        icon()
    ],
    vite: {
        resolve: {
            alias: {
                '@/': `${path.resolve(__dirname, 'src')}/`
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // path to your scss variables
                    additionalData: `@import '@/styles/atoms/variables.scss';`
                }
            }
        }
    }
});