'use client';

import Link from 'next/link';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { GatewayTrigger } from '@/features/DownloadGateway/GatewayContext';

const navItems = [
    { label: '首页', href: '/' },
    {
        label: 'APP下载',
        href: '/yiou-app',
        children: [
            { label: '安卓下载', href: '/yiou-app/android' },
            { label: 'iOS教程', href: '/yiou-app/ios' },
        ]
    },
    { label: '网页版', href: '/yiou-web' },
    { label: '电脑版', href: '/yiou-pc' },
    { label: 'Web3钱包', href: '/yiou-wallet' },
    { label: 'OKB', href: '/okb' },
    { label: '关于OKX', href: '/yiou-jiaoyisuo' },
    { label: '注册', href: '/yiou-zhuce' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
        setOpenDropdown(null);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
                    <div className="w-8 h-8 relative bg-white rounded flex items-center justify-center">
                        <span className="text-black font-bold text-xl">X</span>
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">易欧</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6" ref={dropdownRef}>
                    {navItems.map((item) =>
                        item.children ? (
                            <div
                                key={item.href}
                                className="relative flex items-center"
                                onMouseEnter={() => setOpenDropdown(item.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
                                >
                                    {item.label}
                                </Link>
                                <ChevronDown className={`w-3.5 h-3.5 ml-0.5 text-slate-400 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                                {openDropdown === item.label && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-40">
                                        <div className="bg-[#1e293b] border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                                                    onClick={() => setOpenDropdown(null)}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
                            >
                                {item.label}
                            </Link>
                        )
                    )}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <GatewayTrigger className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center">
                        访问官网 <span className="ml-1">&rarr;</span>
                    </GatewayTrigger>
                    <Link
                        href="/yiou-zhuce"
                        className="bg-white text-black px-4 py-2 rounded font-medium text-sm hover:bg-slate-100 transition-colors"
                    >
                        注册
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-[#0f172a] border-b border-slate-800 shadow-xl">
                    <nav className="flex flex-col p-4 space-y-1">
                        {navItems.map((item) =>
                            item.children ? (
                                <div key={item.href}>
                                    <div className="flex items-center">
                                        <Link
                                            href={item.href}
                                            className="flex-1 px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                            onClick={closeMenu}
                                        >
                                            {item.label}
                                        </Link>
                                        <button
                                            onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                                            className="p-3 text-slate-400 hover:text-white transition-colors"
                                        >
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                    {openDropdown === item.label && (
                                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-700 pl-4">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="block px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                                    onClick={closeMenu}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                    onClick={closeMenu}
                                >
                                    {item.label}
                                </Link>
                            )
                        )}
                        <div className="pt-4 mt-2 border-t border-slate-800 grid grid-cols-2 gap-3">
                            <GatewayTrigger className="bg-slate-800 text-white py-3 rounded-lg text-center font-medium hover:bg-slate-700 transition-colors">
                                访问官网
                            </GatewayTrigger>
                            <Link
                                href="/yiou-zhuce"
                                className="bg-white text-black py-3 rounded-lg text-center font-medium hover:bg-slate-100 transition-colors"
                                onClick={closeMenu}
                            >
                                立即注册
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
