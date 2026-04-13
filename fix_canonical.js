const fs = require('fs');
const path = require('path');

// Map each page.tsx to its correct canonical URL
const pageCanonicals = [
    { file: 'src/app/page.tsx', canonical: 'https://yiouapp.com/' },
    { file: 'src/app/okb/page.tsx', canonical: 'https://yiouapp.com/okb/' },
    { file: 'src/app/yiou-app/page.tsx', canonical: 'https://yiouapp.com/yiou-app/' },
    { file: 'src/app/yiou-app/android/page.tsx', canonical: 'https://yiouapp.com/yiou-app/android/' },
    { file: 'src/app/yiou-app/ios/page.tsx', canonical: 'https://yiouapp.com/yiou-app/ios/' },
    { file: 'src/app/yiou-jiaoyisuo/page.tsx', canonical: 'https://yiouapp.com/yiou-jiaoyisuo/' },
    { file: 'src/app/yiou-pc/page.tsx', canonical: 'https://yiouapp.com/yiou-pc/' },
    { file: 'src/app/yiou-wallet/page.tsx', canonical: 'https://yiouapp.com/yiou-wallet/' },
    { file: 'src/app/yiou-web/page.tsx', canonical: 'https://yiouapp.com/yiou-web/' },
    { file: 'src/app/yiou-xiazai/page.tsx', canonical: 'https://yiouapp.com/yiou-xiazai/' },
    { file: 'src/app/yiou-zhuce/page.tsx', canonical: 'https://yiouapp.com/yiou-zhuce/' },
];

for (const { file, canonical } of pageCanonicals) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) { console.log(`NOT FOUND: ${filePath}`); continue; }

    let content = fs.readFileSync(filePath, 'utf8');
    const updated = content.replace(
        /canonical: 'https:\/\/yiouapp\.com\/?'/g,
        `canonical: '${canonical}'`
    );
    if (updated !== content) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`Fixed canonical: ${file} -> ${canonical}`);
    }
}
console.log('Done!');
