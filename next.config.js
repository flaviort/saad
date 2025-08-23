const path = require('path')

module.exports = {
	experimental: {
		scrollRestoration: true,
	},
	i18n: {
        locales: ['en', 'pt'],
		defaultLocale: 'en',
		localeDetection: false
    },
	//assetPrefix: './',
	//basePath: process.env.PUBLIC_URL,
	sassOptions: {
		includePaths: [path.join(__dirname, 'assets/scss')],
		prependData: `@import 'atoms/variables.scss';`
	},
	images: {
		//unoptimized: true,
		remotePatterns: [
		  	{
				protocol: 'https',
				hostname: 'senzdsn.com',
				//port: '443',
				//pathname: '**',
		  	},
			{
				protocol: 'http',
				hostname: 'localhost',
				//port: '443',
				//pathname: '**',
		  	},
		],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: {
				loader: '@svgr/webpack',
				options: {
					svgoConfig: {
						plugins: [{
							name: 'removeViewBox',
							active: false
						}]
					}
				}
			}
		})

		return config
	}
}