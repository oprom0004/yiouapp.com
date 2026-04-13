'use client';

import { PageHero } from '@/components/PageHero';
import { SubPageContent } from '@/features/SEOContent/types';
import { HelpCircle } from 'lucide-react';

interface SubPageLayoutProps {
    content: SubPageContent;
    ctaHref?: string;
    breadcrumbs?: { label: string; href: string }[];
}

export function SubPageLayout({ content, ctaHref = "/yiou-zhuce", breadcrumbs }: SubPageLayoutProps) {
    const { hero, intro, features, faq } = content;

    return (
        <>
            <PageHero
                title={hero.title}
                subtitle={hero.subtitle}
                cta={hero.cta}
                ctaHref={hero.ctaHref || ctaHref}
                secondaryCta={hero.secondaryCta}
                secondaryCtaHref={hero.secondaryCtaHref}
                useGateway={hero.useGateway !== undefined ? hero.useGateway : true}
                breadcrumbs={breadcrumbs}
            />

            <div className="py-16 bg-[#0f172a]">
                <div className="max-w-4xl mx-auto px-4 space-y-16">
                    {/* Intro Section */}
                    {intro && (
                        <section className="text-slate-300">
                            <h2 className="text-white text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-4">{intro.title}</h2>
                            <div className="space-y-4">
                                {intro.content.map((p, i) => (
                                    <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* SEO Article Section */}
                    {content.seoArticle && (
                        <article className="text-slate-300 space-y-10">
                            {content.seoArticle.title && (
                                <h2 className="text-white text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-4">{content.seoArticle.title}</h2>
                            )}
                            {content.seoArticle.sections.map((section, idx) => (
                                <section key={idx} className="space-y-4">
                                    {section.heading && <h3 className="text-xl font-bold text-white mb-3">{section.heading}</h3>}
                                    <div className="leading-relaxed space-y-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1 [&>strong]:text-blue-200" dangerouslySetInnerHTML={{ __html: section.content }} />
                                </section>
                            ))}
                        </article>
                    )}

                    {/* Features Section */}
                    {features && (
                        <section>
                            <h2 className="text-white text-2xl font-bold mb-8 border-l-4 border-blue-600 pl-4">{features.title}</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {features.items.map((item, index) => (
                                    <div key={index} className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors group">
                                        <h3 className="text-lg font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* FAQ if exists */}
                    {faq && (
                        <section>
                            <h2 className="text-white text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-4">{faq.title}</h2>
                            <div className="space-y-4">
                                {faq.items.map((item, i) => (
                                    <div key={i} className="border-b border-slate-800 pb-4">
                                        <h3 className="text-white font-bold mb-2 flex items-start gap-2">
                                            <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                            <span>{item.question}</span>
                                        </h3>
                                        <div className="text-slate-400 text-sm ml-7 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.answer }} />
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
