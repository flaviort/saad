import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@import 'atoms/variables.scss';`
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
        });

        return config;
    }
};

export default nextConfig;