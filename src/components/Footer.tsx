import Link from 'next/link';
import { GatewayTrigger } from '@/features/DownloadGateway/GatewayContext';

const navigation = {
    product: [
        { name: 'OKX APP下载', href: '/yiou-app' },
        { name: 'Web3 钱包', href: '/yiou-wallet' },
        { name: 'PC 客户端', href: '/yiou-pc' },
        { name: '网页版登录', href: '/yiou-web' },
    ],
    support: [
        { name: '注册教程', href: '/yiou-zhuce' },
        { name: '下载中心', href: '/yiou-xiazai' },
        { name: '关于OKX', href: '/yiou-jiaoyisuo' },
        { name: 'OKB 生态', href: '/okb' },
    ],
    legal: [
        { name: '隐私政策', href: '#' },
        { name: '服务条款', href: '#' },
        { name: '风险提示', href: '#' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-[#0f172a] border-t border-slate-800" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white text-black font-extrabold flex items-center justify-center rounded text-xl">X</div>
                            <span className="text-white font-bold text-xl">OKX中文</span>
                        </div>
                        <p className="text-sm leading-6 text-slate-400">
                            构建更高效、更透明的未来金融体系。全球领先的数字资产服务商。
                        </p>
                        <div className="flex gap-4">
                            <GatewayTrigger className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all">
                                立即注册领盲盒
                            </GatewayTrigger>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">下载与产品</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.product.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">支持与帮助</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.support.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">法律条款</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-sm leading-6 text-slate-400 hover:text-white transition-colors">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-slate-500">&copy; 2026 OKX Technology Company Limited. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
