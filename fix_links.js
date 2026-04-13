const fs = require('fs');
const path = require('path');

function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        // Skip node_modules, .next, .git
        if (['node_modules', '.next', '.git', 'out'].includes(file)) continue;

        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            replaceInFiles(filePath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.json')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;

            // Replace href="/okx-..." with href="/yiou-..."
            // Also replace just '/okx-...' strings in routing properties
            content = content.replace(/\/okx-/g, '/yiou-');

            // Just in case it's written as 'okx-app' without slash, but we must be careful not to break other things.
            // Since we know the routing links all start with /okx- as shown in the grep, the above `/okx-` -> `/yiou-` regex is safe and sufficient.

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated link refs in: ${filePath}`);
            }
        }
    }
}

console.log('Starting link routing replacement...');
replaceInFiles(path.join(__dirname, 'src'));
console.log('Done!');
