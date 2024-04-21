import { readFileSync, writeFileSync } from "fs";
import TextToSVG, { Anchor } from 'text-to-svg';

export class SvgGenerator {
    font: string;
    distFile: string;

    constructor(font: string, distFile: string) { 
        this.font = font;
        this.distFile = distFile;
    }

    generateFile(max: number, step: number): void {
        console.log('Generating...')
        let output = "";
        let icons = new Map<string, any>();
    
        for (var i = 0; i <= max; i = i + step) {
            let svg = this.textToSVG(this.font, i.toString());
            icons.set(i.toString(), svg);
        }
    
        output += readFileSync('./header.partial.js');
        output += '\n\n'
        output += `var icons = ${JSON.stringify(Object.fromEntries(icons), null, 2)}`
        output += '\n\n'
        output += readFileSync('./lookup.partial.js');
        output += '\n'
    
        writeFileSync(this.distFile, output, { flag: 'w' });
        console.log(`Written to ${this.distFile}`);
    }
    
    getSVG(font: string, text: string) : string {
        const ttsModule = TextToSVG.loadSync(font);
        const options = {
            x: 0,
            y: 0,
            fontSize: 32,
            anchor: "top" as Anchor,
        }
    
        return ttsModule.getSVG(text, options);
    }
    
    textToSVG(font: string, text: string) : any {
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
}