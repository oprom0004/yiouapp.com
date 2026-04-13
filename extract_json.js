const fs = require('fs');
const path = require('path');
const config = require('./src/features/SEOContent/config/site-config-okx.js');

const outDir = path.join(__dirname, 'src', 'content', 'zh-CN');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// siteConfig contains homepage, appPage, etc.
const siteConfig = config.siteConfig;

for (const [key, value] of Object.entries(siteConfig)) {
    // Map keys like 'appPage' to 'okx-app.json', 'homepage' to 'homepage.json'
    // I need to look closely at what keys are inside siteConfig.
    let filename = key;
    if (key === 'homepage') filename = 'homepage';
    else if (key === 'appPage') filename = 'okx-app';
    else if (key === 'registerPage') filename = 'okx-zhuce';
    else if (key === 'downloadCenterPage') filename = 'okx-xiazai';
    else if (key === 'pcPage') filename = 'okx-pc';
    else if (key === 'webPage') filename = 'okx-web';
    else if (key === 'walletPage') filename = 'okx-wallet';
    else if (key === 'okbPage') filename = 'okb';
    else if (key === 'aboutPage') filename = 'okx-jiaoyisuo';
    else if (key === 'iosPage') filename = 'okx-app/ios';
    else if (key === 'androidPage') filename = 'okx-app/android';
    
    const filePath = path.join(outDir, filename + '.json');
    const dirMatch = path.dirname(filePath);
    if (!fs.existsSync(dirMatch)) {
        fs.mkdirSync(dirMatch, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf-8');
    console.log(`Wrote ${filePath}`);
}

// Now write a site-config.json
const baseSiteConfig = {
    brand: "OKX",
    brandFull: "OKX(欧意)",
    domain: "https://yiouapp.com",
    nav: [
        { label: "首页", href: "/" },
        { label: "APP下载", href: "/okx-app", children: [
            { label: "安卓下载", href: "/okx-app/android" },
            { label: "苹果iOS", href: "/okx-app/ios" }
        ]},
        { label: "网页版", href: "/okx-web" },
        { label: "电脑版", href: "/okx-pc" },
        { label: "Web3钱包", href: "/okx-wallet" },
        { label: "OKB", href: "/okb" },
        { label: "关于OKX", href: "/okx-jiaoyisuo" }
    ]
};

const siteConfigPath = path.join(__dirname, 'src', 'content', 'site-config.json');
fs.writeFileSync(siteConfigPath, JSON.stringify(baseSiteConfig, null, 2), 'utf-8');
console.log(`Wrote ${siteConfigPath}`);
