'use client';

import Link from 'next/link';
import {
    Smartphone,
    Monitor,
    Wallet,
    Globe,
    Download,
    Apple,
    Gem,
    Info
} from 'lucide-react';

const links = [
    {
        href: '/yiou-app/android',
        label: '安卓版',
        sub: '官方APK直连下载',
        icon: Smartphone,
        gradient: 'from-green-500/20 to-emerald-600/10',
        iconColor: 'text-green-400',
        hoverBorder: 'hover:border-green-500/50',
    },
    {
        href: '/yiou-app/ios',
        label: '苹果iOS版',
        sub: '海外Apple ID教程',
        icon: Apple,
        gradient: 'from-sky-500/20 to-cyan-600/10',
        iconColor: 'text-sky-400',
        hoverBorder: 'hover:border-sky-500/50',
    },
    {
        href: '/yiou-web',
        label: '网页版登录',
        sub: '浏览器直达免安装',
        icon: Globe,
        gradient: 'from-violet-500/20 to-purple-600/10',
        iconColor: 'text-violet-400',
        hoverBorder: 'hover:border-violet-500/50',
    },
    {
        href: '/yiou-pc',
        label: '电脑客户端',
        sub: 'Windows / macOS',
        icon: Monitor,
        gradient: 'from-orange-500/20 to-amber-600/10',
        iconColor: 'text-orange-400',
        hoverBorder: 'hover:border-orange-500/50',
    },
    {
        href: '/yiou-wallet',
        label: 'Web3钱包',
        sub: '去中心化多链聚合',
        icon: Wallet,
        gradient: 'from-blue-500/20 to-indigo-600/10',
        iconColor: 'text-blue-400',
        hoverBorder: 'hover:border-blue-500/50',
    },
    {
        href: '/okb',
        label: 'OKB生态',
        sub: '平台币权益中心',
        icon: Gem,
        gradient: 'from-yellow-500/20 to-amber-600/10',
        iconColor: 'text-yellow-400',
        hoverBorder: 'hover:border-yellow-500/50',
    },
    {
        href: '/yiou-jiaoyisuo',
        label: 'OKX平台',
        sub: '关于OKX交易所',
        icon: Info,
        gradient: 'from-slate-500/20 to-slate-600/10',
        iconColor: 'text-slate-300',
        hoverBorder: 'hover:border-slate-400/50',
    },
    {
        href: '/yiou-xiazai',
        label: '下载中心',
        sub: '全平台下载汇总',
        icon: Download,
        gradient: 'from-rose-500/20 to-pink-600/10',
        iconColor: 'text-rose-400',
        hoverBorder: 'hover:border-rose-500/50',
    },
];

export function QuickLinks() {
    return (
        <section className="py-12 bg-[#0b1120]">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-center text-white text-xl font-bold mb-2">快速入口</h2>
                <p className="text-center text-slate-500 text-sm mb-8">选择适合您的访问方式</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {links.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative overflow-hidden flex flex-col items-center justify-center p-6 bg-gradient-to-br ${link.gradient} rounded-2xl border border-slate-700/60 ${link.hoverBorder} transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/30`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className={`w-6 h-6 ${link.iconColor}`} />
                                </div>
                                <span className="text-base text-white font-bold mb-0.5 relative text-center">{link.label}</span>
                                <span className="text-xs text-slate-400 relative text-center leading-relaxed">{link.sub}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
