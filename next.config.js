const path = require('path')

module.exports = {
	//assetPrefix: './',
	//basePath: process.env.PUBLIC_URL,
	sassOptions: {
		includePaths: [path.join(__dirname, 'assets/scss')],
		prependData: `@import 'atoms/variables.scss';`
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