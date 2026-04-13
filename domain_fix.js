const fs = require('fs');
const path = require('path');

function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        // Skip node_modules and .next, .git
        if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'out') continue;

        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            replaceInFiles(filePath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.xml') || file.endsWith('.txt')) {
            // Protect this script itself
            if (file === 'domain_fix.js') continue;

            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;

            // Replace domain
            content = content.replace(/xuuaph\.cn/g, 'yiouapp.com');
            // Fix okx- to yiou- in sitemap.xml and other places if they have hardcoded URLs
            if (file === 'sitemap.xml' || file === 'robots.txt') {
                content = content.replace(/\/okx-/g, '/yiou-');
            }

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated: ${filePath}`);
            }
        }
    }
}

const targetDir = __dirname;
console.log('Starting global domain and canonical replacement...');
replaceInFiles(targetDir);
console.log('Done!');
