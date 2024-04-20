import { readFileSync, writeFileSync } from "fs";
import process from 'process';
import TextToSVG, { Anchor } from 'text-to-svg';

function generateFile(outputFile: string, minify: boolean) {
    console.log('Generating...')
    let output = "";
    let icons = new Map<string, any>();

    for (var i = 0.0; i <= 5; i = i + 0.5) {
        let svg = textToSVG(font, i.toString());
        icons.set(i.toString(), svg);
    }

    output += readFileSync('./header.partial.js');
    output += '\n\n'
    output += `var icons = ${JSON.stringify(Object.fromEntries(icons), null, minify ? 0 : 2)}`
    output += '\n\n'
    output += readFileSync('./lookup.partial.js');
    output += '\n'

    writeFileSync(outputFile, output, { flag: 'w' });
    console.log(`Written to ${outputFile}`);
}

function getSVG(font: string, text: string) {
    const ttsModule = TextToSVG.loadSync(font);
    const options = {
        x: 0,
        y: 0,
        fontSize: 32,
        anchor: "top" as Anchor,
    }

    return ttsModule.getSVG(text, options);
}

function textToSVG(font: string, text: string) {
    const ttsModule = TextToSVG.loadSync(font);
    const options = {
        x: 0,
        y: 0,
        fontSize: 32,
        anchor: "top" as Anchor,
    }
    
    const metrics = ttsModule.getMetrics(text, options);

    return {
        x: metrics.x,
        y: metrics.y,
        width: metrics.width,
        height: metrics.height,
        path: ttsModule.getD(text, options)
    };
}

const font = 'node_modules/@fontsource/sofia-sans-extra-condensed/files/sofia-sans-extra-condensed-latin-600-normal.woff';
const output = 'dist/ha-number-icons.js'

const args = process.argv.slice(2);
if (args == undefined || args.length == 0) {
    generateFile(output, false);
} else if ('test' == args[0]) {
    // Test with https://codebeautify.org/svg-viewer
    console.log(getSVG(font, 'test'));
}
