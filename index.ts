import process from 'process';
import { SvgGenerator } from './SvgGenerator'

const font = 'node_modules/@fontsource/sofia-sans-condensed/files/sofia-sans-condensed-latin-700-normal.woff';
const distDirectory = 'dist'
const distFile = 'ha-number-icons'

const args = process.argv.slice(2);
const svgGenerator = new SvgGenerator(font, distDirectory, distFile);

if (args == undefined || args.length == 0) {
    console.error("ERROR: Run with either generate or test arguments...");
} else if ('generate' == args[0]) {
    svgGenerator.generateFile(4, 100, 0.5, '°', [' Off ', ' Uit '], true);
} else if ('test' == args[0]) {
    // Test with https://codebeautify.org/svg-viewer
    console.log(svgGenerator.getSVG(font, '88.5°'));
} else {
    console.error(`ERROR: Invalid argument supplied ${args[0]}...`);
}
