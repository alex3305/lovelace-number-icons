import process from 'process';
import { SvgGenerator } from './SvgGenerator'

const font = 'node_modules/@fontsource/sofia-sans-condensed/files/sofia-sans-condensed-latin-700-normal.woff';
const outputDir = 'cache';

const args = process.argv.slice(2);

if (args == undefined || args.length == 0) {
    console.error("ERROR: Run with either generate or test arguments...");
} else if ('generate' == args[0]) {
    new SvgGenerator(font, outputDir, 'degrees', 'deg')
                    .generateFile(4, 75, 0.5, '°', [' Off ', ' Uit '], true);
    new SvgGenerator(font, outputDir, 'numbers', 'num')
                    .generateFile(0, 100, 1, '', [], true);
} else if ('test' == args[0]) {
    // Test with https://codebeautify.org/svg-viewer
    const svgGenerator = new SvgGenerator(font, outputDir, '', '');
    console.log(svgGenerator.getSVG(font, '88.5°'));
} else {
    console.error(`ERROR: Invalid argument supplied ${args[0]}...`);
}
