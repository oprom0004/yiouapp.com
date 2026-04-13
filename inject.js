const fs = require('fs');
const path = require('path');

const files = [
    'page.tsx', 'okx-zhuce/page.tsx', 'okx-xiazai/page.tsx', 'okx-web/page.tsx',
    'okx-wallet/page.tsx', 'okx-pc/page.tsx', 'okx-jiaoyisuo/page.tsx',
    'okx-app/page.tsx', 'okx-app/ios/page.tsx', 'okx-app/android/page.tsx', 'okb/page.tsx'
];

files.forEach(f => {
    let p = path.join(__dirname, 'src/app', f);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf-8');
        let targetKey = 'homepage';
        let jsonSlug = "['homepage']";
        if (f.includes('okx-app/ios')) { targetKey = 'iosPage'; jsonSlug = "['okx-app', 'ios']"; }
        else if (f.includes('okx-app/android')) { targetKey = 'androidPage'; jsonSlug = "['okx-app', 'android']"; }
        else if (f.includes('okx-app')) { targetKey = 'appPage'; jsonSlug = "['okx-app']"; }
        else if (f.includes('okx-zhuce')) { targetKey = 'registerPage'; jsonSlug = "['okx-zhuce']"; }
        else if (f.includes('okx-xiazai')) { targetKey = 'downloadCenterPage'; jsonSlug = "['okx-xiazai']"; }
        else if (f.includes('okx-pc')) { targetKey = 'pcPage'; jsonSlug = "['okx-pc']"; }
        else if (f.includes('okx-web')) { targetKey = 'webPage'; jsonSlug = "['okx-web']"; }
        else if (f.includes('okx-wallet')) { targetKey = 'walletPage'; jsonSlug = "['okx-wallet']"; }
        else if (f.includes('okb')) { targetKey = 'okbPage'; jsonSlug = "['okb']"; }
        else if (f.includes('okx-jiaoyisuo')) { targetKey = 'aboutPage'; jsonSlug = "['okx-jiaoyisuo']"; }

        const exportRegex = new RegExp(`export default function [a-zA-Z0-9_]+\\(\\) {\\s*`);
        const match = content.match(exportRegex);

        // Count how many times it was already defined (we want exactly 1 inside the component body, 1 inside metadata)
        // But metadata generates it inside the function, the body generates it inside the body.
        // It failed previously because I deleted the variable from the body mistakenly.

        let needsInject = false;
        if (match) {
            const bodyStr = content.substring(content.indexOf(match[0]));
            if (!bodyStr.includes(`const ${targetKey} = getPageContentBySlug(${jsonSlug});`)) {
                needsInject = true;
            }
        }

        if (needsInject) {
            content = content.replace(exportRegex, `${match[0]}\n    const ${targetKey} = getPageContentBySlug(${jsonSlug});\n`);
        }

        fs.writeFileSync(p, content, 'utf-8');
        console.log(`Checked ${f}`);
    }
});
