import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' assert { type: 'json' };

const version = pkg.version;
const isProduction = process.env.NODE_ENV !== 'development';

export default [
    {
        input: './src/main.ts',
        output: [
            {
                file: './dist/bundle.esm.js',
                format: 'es',
                sourcemap: true,
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
        input: ["./src/main.ts"],
        output: [{ file: "./dist/bundle.d.ts", format: "es" }],
        plugins: [dts()]
    },
]
