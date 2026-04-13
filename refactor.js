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
        let jsonSlug = "'homepage'";

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
        else { jsonSlug = "['homepage']"; }

        // Remove old import
        content = content.replace(/import \{ siteConfig \} from '@\/features\/SEOContent\/config\/site-config-okx';\n?/g, "");

        // Add new import
        if (!content.includes("import { getPageContentBySlug }")) {
            content = content.replace("import { Metadata } from 'next';", "import { Metadata } from 'next';\nimport { getPageContentBySlug } from '@/lib/content';");
        }

        // Remove destructuring
        const destructureRegex = new RegExp(`const \\{ ${targetKey} \\} = siteConfig;\\n?`, 'g');
        content = content.replace(destructureRegex, '');

        // Transform metadata
        const metadataRegex = /export const metadata: Metadata = {[\s\S]*?alternates: {[\s\S]*?},[\s\S]*?};/;
        const metadataReplacement = `export async function generateMetadata(): Promise<Metadata> {
    const ${targetKey} = getPageContentBySlug(${jsonSlug});
    return {
        title: ${targetKey}.metadata.title,
        description: ${targetKey}.metadata.description,
        alternates: {
            canonical: 'https://yiouapp.com/',
        },
    };
}`;
        content = content.replace(metadataRegex, metadataReplacement);

        // Remove jsonLd
        content = content.replace(/const jsonLd = {[\s\S]*?};\n?/, '');

        // Inject content extraction
        const exportRegex = /export default function [a-zA-Z0-9_]+\(\) {/;
        const match = content.match(exportRegex);
        if (match) {
            const replacement = `${match[0]}
    const ${targetKey} = getPageContentBySlug(${jsonSlug});
    
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: ${targetKey}.jsonLd?.name || '',
        url: ${targetKey}.jsonLd?.url || '',
        description: ${targetKey}.jsonLd?.description || '',
    };
`;
            content = content.replace(exportRegex, replacement);
        }

        fs.writeFileSync(p, content, 'utf-8');
        console.log(`Updated ${f}`);
    }
});
