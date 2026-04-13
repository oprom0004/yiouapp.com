import { Metadata } from 'next';
import { getPageContentBySlug } from '@/lib/content';
import { PageHero } from '@/components/PageHero';

import { Monitor, Smartphone, Globe } from 'lucide-react';



export async function generateMetadata(): Promise<Metadata> {
    const downloadCenterPage = getPageContentBySlug(['yiou-xiazai']);
    return {
        title: downloadCenterPage.metadata.title,
        description: downloadCenterPage.metadata.description,
        alternates: {
            canonical: 'https://yiouapp.com/',
        },
    };
}

export default function DownloadCenterPage() {
    
    
    
    const downloadCenterPage = getPageContentBySlug(['yiou-xiazai']);
const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: downloadCenterPage.jsonLd?.name || '',
        url: downloadCenterPage.jsonLd?.url || '',
        description: downloadCenterPage.jsonLd?.description || '',
    };

    
    
    
    return (
        <>
            <PageHero
                title={downloadCenterPage.hero.title}
                subtitle={downloadCenterPage.hero.subtitle}
                cta={downloadCenterPage.hero.cta || "前往下载"}
                ctaHref="/yiou-xiazai"
                useGateway={true}
                breadcrumbs={[
                    { label: '首页', href: '/' },
                    { label: '下载中心', href: '/yiou-xiazai' }
                ]}
            />

            <div className="pt-16 pb-16 bg-[#0f172a]">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {/* Download Cards */}
                        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center hover:border-blue-500 transition-all group">
                            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                                <Smartphone className="w-8 h-8 text-blue-400 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Android / iOS APP</h3>
                            <p className="text-slate-400 text-sm mb-6">随时随地交易，行情一手掌握</p>
                            <a href="/yiou-app" className="inline-block w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">APP 下 载</a>
                        </div>

                        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center hover:border-blue-500 transition-all group">
                            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                                <Monitor className="w-8 h-8 text-blue-400 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">PC 客户端</h3>
                            <p className="text-slate-400 text-sm mb-6">Windows / macOS 桌面版</p>
                            <a href="/yiou-pc" className="inline-block w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium">电脑版下载</a>
                        </div>

                        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center hover:border-blue-500 transition-all group">
                            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                                <Globe className="w-8 h-8 text-blue-400 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Web 网页版</h3>
                            <p className="text-slate-400 text-sm mb-6">稳定版线路，API 直连</p>
                            <a href="/yiou-web" className="inline-block w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium">网页版入口</a>
                        </div>
                    </div>

                    {/* Intro Section if exists */}
                    {downloadCenterPage.intro && (
                        <section className="text-slate-300">
                            <h2 className="text-white text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-4">{downloadCenterPage.intro.title}</h2>
                            <div className="space-y-4">
                                {downloadCenterPage.intro.content.map((p, i) => (
                                    <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* SEO Article Section */}
                    {downloadCenterPage.seoArticle && (
                        <article className="text-slate-300 space-y-10 mt-16">
                            {downloadCenterPage.seoArticle.title && (
                                <h2 className="text-white text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-4">{downloadCenterPage.seoArticle.title}</h2>
                            )}
                            {downloadCenterPage.seoArticle.sections.map((section, idx) => (
                                <section key={idx} className="space-y-4">
                                    {section.heading && <h3 className="text-xl font-bold text-white mb-3">{section.heading}</h3>}
                                    <div className="leading-relaxed space-y-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1 [&>strong]:text-blue-200" dangerouslySetInnerHTML={{ __html: section.content }} />
                                </section>
                            ))}
                        </article>
                    )}

                    {/* Features Section */}
                    {downloadCenterPage.features && (
                        <section className="mt-16">
                            <h2 className="text-white text-2xl font-bold mb-8 border-l-4 border-blue-600 pl-4">{downloadCenterPage.features.title}</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {downloadCenterPage.features.items.map((item, index) => (
                                    <div key={index} className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors group">
                                        <h3 className="text-lg font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}
