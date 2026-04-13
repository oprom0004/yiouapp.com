const fs = require('fs');
const path = require('path');

// 1. Fix all TSX routing occurrences (okx- -> yiou-)
const appDir = path.join(__dirname, 'src', 'app');
function fixTsx(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixTsx(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            if (content.includes('okx-')) {
                content = content.replace(/okx-/g, 'yiou-');
                changed = true;
            }
            if (content.includes('关于OKX')) {
                content = content.replace(/'关于OKX'/g, "'易欧交易所'");
                changed = true;
            }
            if (changed) {
                fs.writeFileSync(fullPath, content);
            }
        }
    }
}
fixTsx(appDir);

// 2. Wash the JSON contents (OKX -> 易欧 / 易欧APP)
const contentDir = path.join(__dirname, 'src', 'content', 'zh-CN');
function washJson(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            washJson(fullPath);
        } else if (fullPath.endsWith('.json') && file !== 'homepage.json' && file !== 'okb.json') {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Basic global replacements to wash the text
            content = content.replace(/欧意/g, '易欧');
            content = content.replace(/欧易/g, '易欧');
            content = content.replace(/OKEx/g, '易欧APP');
            content = content.replace(/OKX(?!-)/g, '易欧');
            content = content.replace(/okx-xiazai/g, 'yiou-xiazai');

            fs.writeFileSync(fullPath, content);
        }
    }
}
washJson(contentDir);
console.log('Successfully completed full deep-wash and routing fix!');
