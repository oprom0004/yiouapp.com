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

        // Fix metadata
        const mdRegex = /export const metadata: Metadata = \{[\s\S]*?alternates: \{[\s\S]*?\},?\s*\};/m;
        content = content.replace(mdRegex,
            `export async function generateMetadata(): Promise<Metadata> {
    const ${targetKey} = getPageContentBySlug(${jsonSlug});
    return {
        title: ${targetKey}.metadata?.title || '',
        description: ${targetKey}.metadata?.description || '',
        alternates: {
            canonical: 'https://yiouapp.com/',
        },
    };
}`);

        // Fix double variable declaration by simply splitting and merging the first declaration
        const searchStr = `const ${targetKey} = getPageContentBySlug(${jsonSlug});`;
        const parts = content.split(searchStr);
        if (parts.length > 2) {
            content = parts[0] + searchStr + parts.slice(1).join("");
        }

        fs.writeFileSync(p, content, 'utf-8');
        console.log(`Cleaned ${f}`);
    }
});
