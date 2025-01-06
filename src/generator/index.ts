import process from "process";
import { SvgGenerator } from "./SvgGenerator";

const font =
    "node_modules/@fontsource/sofia-sans-condensed/files/sofia-sans-condensed-latin-700-normal.woff";
const outputDir = "cache";

const args = process.argv.slice(2);

if (args == undefined || args.length == 0) {
    console.error("ERROR: Run with either generate or test arguments...");
} else if ("generate" == args[0]) {
    new SvgGenerator(font, outputDir, "decimal-degrees", "deg").generateFile(
        0,                  // Starting value
        100,                // Ending value
        0.5,                // Step
        1,                  // Decimals
        "°",                // Suffix
        [" Off ", " Uit "], // Additional values
        true                // Add padding
    );

    new SvgGenerator(font,outputDir,"non-decimal-degrees","ndg",)
            .generateFile(0, 100, 1, 0, "°", [], true);

    new SvgGenerator(font, outputDir, "numbers", "num")
            .generateFile(0, 100, 1, 0, "", [], true);
} else if ("test" == args[0]) {
    // Test with https://codebeautify.org/svg-viewer
    const svgGenerator = new SvgGenerator(font, outputDir, "", "");
    console.log(svgGenerator.getSVG(font, "88.5°"));
} else {
    console.error(`ERROR: Invalid argument supplied ${args[0]}...`);
}
