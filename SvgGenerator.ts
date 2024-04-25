import * as fs from "node:fs";
import path from "node:path";
import TextToSVG, { Anchor } from 'text-to-svg';
import { minify } from "uglify-js";

export class SvgGenerator {

    static Anchor = "top" as Anchor;

    static FontSize = 20;
    
    distDirectory: string;
    
    fileName: string;
    
    font: string;

    output: string;

    constructor(font: string, distDirectory: string, fileName: string) { 
        this.font = font;
        this.distDirectory = distDirectory;
        this.fileName = fileName;
        this.output = '';
    }

    generateFile(max: number, step: number, suffix?: string): void {
        console.log('Generating...')
        let icons = new Map<string, any>();
    
        for (let i = 0; i <= max; i = i + step) {
            let svg = this.textToSVG(this.font, `${i.toFixed(1).toString()}${suffix}`);
            icons.set(i.toString(), svg);
        }
    
        this.output += fs.readFileSync('./header.partial.js');
        this.output += `\n//\n// Font Source: ${this.font}\n//\n\n`;
        this.output += `var icons = ${JSON.stringify(Object.fromEntries(icons), null, 2)}`;
        this.output += '\n\n';
        this.output += fs.readFileSync('./lookup.partial.js');
        this.output += '\n';

        if (!fs.existsSync(this.distDirectory)) {
            fs.mkdirSync(this.distDirectory);
        }
    
        fs.writeFileSync(`${this.distDirectory}${path.sep}${this.fileName}.js`, this.output, { flag: 'w' });
        console.log(`Written to ${this.fileName}`);
    }

    minifyGeneratedFile(): void {
        if (!fs.existsSync(this.distDirectory)) {
            fs.mkdirSync(this.distDirectory);
        }

        if (this.output == '') {
            console.error('ERROR: Please generate SVG data before minifying.');
            return;
        }

        let result = minify(this.output);
        fs.writeFileSync(`${this.distDirectory}${path.sep}${this.fileName}.min.js`, result.code, { flag: 'w' });
    }
    
    getSVG(font: string, text: string): string {
        const ttsModule = TextToSVG.loadSync(font);
        const options = {
            x: 0,
            y: 0,
            fontSize: SvgGenerator.FontSize,
            anchor: SvgGenerator.Anchor,
        }
    
        return ttsModule.getSVG(text, options);
    }
    
    textToSVG(font: string, text: string): any {
        const ttsModule = TextToSVG.loadSync(font);
        const options = {
            x: 0,
            y: 0,
            fontSize: SvgGenerator.FontSize,
            anchor: SvgGenerator.Anchor,
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