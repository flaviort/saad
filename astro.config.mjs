import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import robotsTxt from "astro-robots-txt";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
	site: 'https://saad.cx',
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
		}),
		sitemap(),
        robotsTxt(),
        (await import('astro-compress')).default({
			SVG: false
		}),
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