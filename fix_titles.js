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
        } else if (file.endsWith('.json')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;

            // Specifically target the "易欧..._易欧APP..." or "易欧... | 易欧APP..." pattern in titles
            content = content.replace(/"title": "易欧(.*?)_易欧APP(.*?)"/g, '"title": "易欧$1_欧意OKX $2"');
            content = content.replace(/"title": "易欧(.*?) \| 易欧APP(.*?)"/g, '"title": "易欧$1 | 欧意OKX $2"');
            // Check descriptions too
            content = content.replace(/"description": "(.*?)易欧APP(.*?)"/g, '"description": "$1欧意OKX$2"');

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Polished SEO branding in: ${filePath}`);
            }
        }
    }
}

console.log('Starting semantic deduplication...');
replaceInFiles(path.join(__dirname, 'src', 'content', 'zh-CN'));
console.log('Done!');
