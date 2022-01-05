import fs from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default fs.readdirSync('./src/js')
    .filter(file => file.endsWith('.js'))
    .reduce((files, file) => {
        files.push({
            input: `./src/js/${file}`,
            output: {
                file: `dist/js/${file}`,
                format: 'iife',
            },
            plugins: [
                resolve(),
                commonjs(),
            ],
        });

        return files;
    }, []);
