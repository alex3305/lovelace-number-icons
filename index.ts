import process from 'process';
import { SvgGenerator } from './SvgGenerator'

const font = 'node_modules/@fontsource/sofia-sans-extra-condensed/files/sofia-sans-extra-condensed-latin-600-normal.woff';
const distDirectory = 'dist'
const distFile = 'ha-number-icons.js'

let args = process.argv.slice(2);
let svgGenerator = new SvgGenerator(font, distDirectory, distFile);

if (args == undefined || args.length == 0) {
    console.error("ERROR: Run with either generate or test arguments...");
} else if ('generate' == args[0]) {
    svgGenerator.generateFile(30, 0.5);
} else if ('test' == args[0]) {
    // Test with https://codebeautify.org/svg-viewer
    console.log(svgGenerator.getSVG(font, 'test'));
} else {
    console.error(`ERROR: Invalid argument supplied ${args[0]}...`);
}
