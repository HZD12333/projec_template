import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react-swc';
import browserslist from 'browserslist';
import { resolve } from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import { defineConfig, loadEnv } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import checker from 'vite-plugin-checker';
import viteCompression from 'vite-plugin-compression';
import progress from 'vite-plugin-progress';
import ViteRestart from 'vite-plugin-restart';

import server from './scripts/server';


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const viteEnv = loadEnv(mode, process.cwd(), '');
    const browserslistConfig = browserslist.loadConfig({ path: '.' });
    return   {
        plugins: [
            react(),
            checker({ typescript: true }),
            progress(),
            analyzer(),
            viteCompression({
                verbose: true, // 是否在控制台中输出压缩结果
                disable: false,
                threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
                algorithm: 'gzip', // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
                ext: '.gz',
                deleteOriginFile: true // 源文件压缩后是否删除(我为了看压缩后的效果，先选择了true)
            }),
            legacy({
                targets: browserslistConfig,
                additionalLegacyPolyfills: [ 'regenerator-runtime/runtime' ], // 面向IE11时需要此插件
            }),
            ViteRestart({
                restart: [
                    'vite.config.[jt]s',
                ]
            })
        ],
        base: viteEnv.VITE_APP_BASE_URL,
        resolve: {
            // 设置文件./src路径为 @
            alias: [
                {
                    find: '@',
                    replacement: resolve(__dirname, './src')
                }
            ]
        },
        css: {
            //* css模块化
            modules: { // css模块化 文件以.module.[css|less|scss]结尾
                generateScopedName: '[name]__[local]___[hash:base64:10]',
                hashPrefix: 'prefix',
                localsConvention: 'camelCaseOnly',
                scopeBehaviour: 'local'
            },
            //* 预编译支持less
            preprocessorOptions: {
                scss: {
                    // 支持内联 JavaScript
                    javascriptEnabled: true,
                },
            },
            postcss: {
                plugins: [ postcssPresetEnv() ]
            },
            devSourcemap: true,
        },
        esbuild: {
            pure: [ 'console.log' ], // 删除 console.log
            drop: [ 'debugger' ], // 删除 debugger
        } ,
        build: {
            sourcemap: viteEnv.VITE_APP_NODE !== 'production',
            minify: 'esbuild',
            emptyOutDir: true,
            reportCompressedSize: false,
            manifest: true,
            chunkSizeWarningLimit: 1000,
            assetsInlineLimit: 500,
            rollupOptions: {
                output: {
                    chunkFileNames: 'static/chunk/[name]-[hash].js',
                    entryFileNames: 'static/entry/[name]-[hash].js',
                    // 资源文件名 css 图片等等
                    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
                    // 大文件拆分
                    manualChunks(id) {
                        console.log('manualChunks', id);
                        if (id.includes('/src')) {
                            return 'type-utils';
                        }
                        if (id.includes('node_modules')) {
                            // 一个模块只要一个文件，如果需要一个vue一个文件，以下代码可忽略
                            //把vue vue-router  @vueuse 等核心模块打包成一个文件
                            if (id.includes('vue')) {
                                return 'vue';
                            }
                            // 最小化拆分包
                            if (id.includes('react') || id.includes('react-dom')) {
                                return 'react-utils';
                            }
                            if (id.includes('lodash')) {
                                return 'lodash-utils';
                            }
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    },
                }
            },
        },
        server,
    };
});
