import path from 'path'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const svgrOptions = {
	svgoConfig: {
		plugins: [{
			name: 'preset-default',
			params: {
				overrides: {
					removeViewBox: false
				}
			}
		}]
	}
}

const nextConfig: NextConfig = {
	//assetPrefix: './',
	//basePath: process.env.PUBLIC_URL,
	sassOptions: {
		loadPaths: [path.join(process.cwd(), 'assets/scss')],
		additionalData: `@use 'atoms/variables' as *;`
	},
	images: {
		//unoptimized: true,
		qualities: [75, 100],
		// saad.local resolves to 127.0.0.1, which Next blocks by default (SSRF protection).
		// only allowed in `next dev`, production builds keep the protection
		dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
		remotePatterns: [
		  	{
				protocol: 'https',
				hostname: 'senzdsn.com',
				//port: '443',
				//pathname: '**',
		  	},
			{
				protocol: 'http',
				hostname: 'saad.local',
				//port: '443',
				//pathname: '**',
		  	},
		],
	},
	turbopack: {
		rules: {
			'*.svg': {
				loaders: [{
					loader: '@svgr/webpack',
					options: svgrOptions
				}],
				as: '*.js'
			}
		}
	},
	webpack(config: { module: { rules: object[] } }) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: {
				loader: '@svgr/webpack',
				options: svgrOptions
			}
		})

		return config
	}
}

export default withNextIntl(nextConfig)
