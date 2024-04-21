"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvgGenerator = void 0;
const fs_1 = require("fs");
const text_to_svg_1 = __importDefault(require("text-to-svg"));
class SvgGenerator {
    constructor(font, distFile) {
        this.font = font;
        this.distFile = distFile;
    }
    generateFile(max, step) {
        console.log('Generating...');
        let output = "";
        let icons = new Map();
        for (var i = 0; i <= max; i = i + step) {
            let svg = this.textToSVG(this.font, i.toString());
            icons.set(i.toString(), svg);
        }
        output += (0, fs_1.readFileSync)('./header.partial.js');
        output += '\n\n';
        output += `var icons = ${JSON.stringify(Object.fromEntries(icons), null, 2)}`;
        output += '\n\n';
        output += (0, fs_1.readFileSync)('./lookup.partial.js');
        output += '\n';
        (0, fs_1.writeFileSync)(this.distFile, output, { flag: 'w' });
        console.log(`Written to ${this.distFile}`);
    }
    getSVG(font, text) {
        const ttsModule = text_to_svg_1.default.loadSync(font);
        const options = {
            x: 0,
            y: 0,
            fontSize: 32,
            anchor: "top",
        };
        return ttsModule.getSVG(text, options);
    }
    textToSVG(font, text) {
        const ttsModule = text_to_svg_1.default.loadSync(font);
        const options = {
            x: 0,
            y: 0,
            fontSize: 32,
            anchor: "top",
        };
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
exports.SvgGenerator = SvgGenerator;
