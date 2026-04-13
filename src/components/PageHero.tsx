'use client';

import Link from 'next/link';
import { ArrowRight, Download, ChevronRight } from 'lucide-react';
import { GatewayTrigger } from '@/features/DownloadGateway/GatewayContext';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface PageHeroProps {
    title: string;
    subtitle: string;
    cta?: string;
    ctaHref?: string;
    secondaryCta?: string;
    secondaryCtaHref?: string;
    useGateway?: boolean;
    breadcrumbs?: BreadcrumbItem[];
}

export function PageHero({
    title,
    subtitle,
    cta = "立即下载",
    ctaHref = "#",
    secondaryCta,
    secondaryCtaHref,
    useGateway = false,
    breadcrumbs
}: PageHeroProps) {
    return (
        <div className="relative isolate overflow-hidden bg-[#0f172a] pt-32 pb-24 lg:pt-40 lg:pb-32">
            {/* Background effects */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.slate.800),theme(colors.slate.900))] opacity-50" />
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-[#0f172a] shadow-xl shadow-blue-600/10 ring-1 ring-blue-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

            <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                {breadcrumbs && (
                    <nav className="flex justify-center mb-8" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2 text-sm text-slate-400">
                            {breadcrumbs.map((item, index) => (
                                <li key={index} className="flex items-center">
                                    {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-slate-600" />}
                                    <Link href={item.href} className="hover:text-blue-400 transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}

                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 pb-2">
                    {title}
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
                    {subtitle}
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    {useGateway ? (
                        <GatewayTrigger className="rounded-md bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-xl hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95 duration-200">
                            {cta} <Download className="w-5 h-5" />
                        </GatewayTrigger>
                    ) : (
                        <Link href={ctaHref} className="rounded-md bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-xl hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95 duration-200">
                            {cta} <ArrowRight className="w-5 h-5" />
                        </Link>
                    )}

                    {secondaryCta && secondaryCtaHref && (
                        <Link href={secondaryCtaHref} className="rounded-md bg-transparent px-8 py-3.5 text-base font-semibold text-white ring-1 ring-inset ring-slate-600 hover:bg-slate-800 transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95 duration-200">
                            {secondaryCta} <ChevronRight className="w-5 h-5" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
