const fs = require('fs');
const path = require('path');

function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        if (['node_modules', '.next', '.git', 'out'].includes(file)) continue;

        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            replaceInFiles(filePath);
        } else if (file.endsWith('.json') || file.endsWith('.tsx') || file.endsWith('.ts')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;

            // Fix the double replacement "易欧易欧" caused by replacing both "欧意" and "OKX" independently
            content = content.replace(/易欧易欧/g, '易欧');

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Fixed duplicates in: ${filePath}`);
            }
        }
    }
}

console.log('Starting text deduplication...');
replaceInFiles(path.join(__dirname, 'src'));
console.log('Done!');
