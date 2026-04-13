const fs = require('fs');
const path = require('path');

function processFiles(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        if (['node_modules', '.next', '.git', 'out'].includes(file)) continue;

        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            processFiles(filePath);
        } else if (file.endsWith('.json')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;

            // Remove 2026 dates
            content = content.replace(/2026版/g, '最新版');
            content = content.replace(/2026易欧官网/g, '易欧官网更新');
            content = content.replace(/2026最新版/g, '官方最新版');
            content = content.replace(/2026官方直连/g, '高速官方直连');
            content = content.replace(/2026年 易欧 生态发展动态/g, '当前易欧生态最新发展动态');
            content = content.replace(/进入 2026 年/g, '如今');
            content = content.replace(/okx-android-2026.apk/g, 'okx-android-latest.apk');

            // Clean up old corporate text
            content = content.replace(/了解易欧交易所。全球领先的数字资产服务商。欧意OKX团队致力于通过区块链技术构建更透明、更高效的未来金融体系。/g, '想深入了解易欧交易所（欧意OKX）的背景吗？带您看懂其发展历程、合规持牌进度以及平台安全性，拒绝小白式盲目入场。');

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Cleaned up dates and PR text in: ${filePath}`);
            }
        }
    }
}

console.log('Starting general text cleanup...');
processFiles(path.join(__dirname, 'src', 'content', 'zh-CN'));
console.log('Done!');
