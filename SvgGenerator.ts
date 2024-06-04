import * as fs from "node:fs";
import path from "node:path";
import TextToSVG, { Anchor } from 'text-to-svg';

export class SvgGenerator {

    static Anchor = "top" as Anchor;

    static FontSize = 20;
    
    distDirectory: string;
    
    fileName: string;
    
    font: string;

    prefix: string;

    constructor(font: string, distDirectory: string, fileName: string, prefix: string) { 
        this.font = font;
        this.distDirectory = distDirectory;
        this.fileName = fileName;
        this.prefix = prefix;
    }

    generateFile(min: number, max: number, step: number, decimals: number, suffix: string = '', additionalValues: string[] = [], padding: boolean = false): void {
        console.log('Generating...')
        const icons = new Map<string, object>();
    
        for (let i = min; i <= max; i = i + step) {
            let text = `${i.toFixed(decimals).toString()}${suffix}`;

            if (padding && max >= 10 && i < 10) {
                text = ` ${i.toFixed(decimals).toString()}${suffix} `;
            }

            icons.set(i.toString(), this.textToSVG(this.font, text));
        }

        if (additionalValues.length) {
            for (const val of additionalValues) {
                icons.set(
                    val.toLowerCase().trim(),
                    this.textToSVG(this.font, val)
                );
            }
        }

        const output = fs.readFileSync('./number-icons.template.js').toString()
                .replace('{{FONT_SOURCE}}', this.font)
                .replace('{{PREFIX}}', this.prefix)
                .replace('const icons = {};', `const icons = ${JSON.stringify(Object.fromEntries(icons), null, 2)}`);

        if (!fs.existsSync(this.distDirectory)) {
            fs.mkdirSync(this.distDirectory);
        }
    
        fs.writeFileSync(`${this.distDirectory}${path.sep}${this.fileName}.js`, output, { flag: 'w' });
        console.log(`Written to ${this.fileName}`);
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
    
    textToSVG(font: string, text: string): object {
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
