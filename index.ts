import process from 'process';
import TextToSVG, { Anchor } from 'text-to-svg';

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
        viewBox: {
            x: metrics.x,
            y: metrics.y,
            width: metrics.width,
            height: metrics.height
        },
        path: ttsModule.getD(text, options)
    };
}

const font = 'node_modules/@fontsource/sofia-sans-extra-condensed/files/sofia-sans-extra-condensed-latin-600-normal.woff';

const args = process.argv.slice(2);
if (args == undefined || args.length == 0) {
    console.log('Generating...')

    for (var i = 0.0; i <= 30; i = i + 0.5) {
        console.log(textToSVG(font, i.toString()));
    }

} else if ('test' == args[0]) {
    // Test with https://codebeautify.org/svg-viewer
    console.log(getSVG(font, 'test'));
}
