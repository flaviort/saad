import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    integrations: [
        icon({
            svgoOptions: {
                plugins: [{
                    name: 'preset-default',
                    params: {
                        overrides: {
                            mergePaths: false
                        }
                    }
                }]
            }
        })
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
                    additionalData: `@import '@/styles/atoms/variables.scss';`
                }
            }
        }
    }
});