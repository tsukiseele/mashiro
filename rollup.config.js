import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' assert { type: 'json' };

const version = pkg.version;
const isProduction = process.env.NODE_ENV !== 'development';

const config = [
    {
        input: './src/main.ts',
        output: [
            {
                file: 'dist/js/bundle.js',
                // format: 'iife',
                sourcemap: true,
                banner: `/*! ${version} */`
            }
        ],
        plugins: [
            typescript({
                tsconfig: './tsconfig.json'
            })
        ],
        external: ['cheerio']
    },
    {
        input: "./src/main.ts",
        output: [{ file: "./lib/main.d.ts", format: "es" }],
        plugins: [dts()]
    }
]

export default config;