const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Input & output folders
const inputFolder = path.join(__dirname, 'assets-raw');   // Change as needed
const outputFolder = path.join(__dirname, 'assets');      // Change as needed

function processFolder(currentInput, currentOutput) {
    if (!fs.existsSync(currentOutput)) {
        fs.mkdirSync(currentOutput, { recursive: true });
    }

    const entries = fs.readdirSync(currentInput, { withFileTypes: true });

    entries.forEach(entry => {
        const inputPath = path.join(currentInput, entry.name);
        const outputPath = path.join(currentOutput, entry.name);

        if (entry.isDirectory()) {
            processFolder(inputPath, outputPath);
        } else if (entry.name.toLowerCase().endsWith('.svg')) {
            try {
                execSync(`inkscape" "${inputPath}" -o "${outputPath}" --export-text-to-path`, {
                    stdio: 'inherit'
                });
                console.log(`✅ Converted SVG: ${path.relative(inputFolder, inputPath)}`);
            } catch (err) {
                console.error(`❌ Failed to convert SVG: ${path.relative(inputFolder, inputPath)}`);
                console.error(err);
            }
        } else {
            try {
                fs.copyFileSync(inputPath, outputPath);
                console.log(`📄 Copied: ${path.relative(inputFolder, inputPath)}`);
            } catch (err) {
                console.error(`❌ Failed to copy: ${path.relative(inputFolder, inputPath)}`);
                console.error(err);
            }
        }
    });
}

processFolder(inputFolder, outputFolder);

console.log('✨ All done!');
