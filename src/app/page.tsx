import { Metadata } from 'next';
import { getPageContentBySlug } from '@/lib/content';
import { PageHero } from '@/components/PageHero';
import { QuickLinks } from '@/components/QuickLinks';
import { HelpCircle } from 'lucide-react';




export async function generateMetadata(): Promise<Metadata> {
    const homepage = getPageContentBySlug(['homepage']);
    return {
        title: homepage.metadata.title,
        description: homepage.metadata.description,
        alternates: {
            canonical: 'https://yiouapp.com/',
        },
    };
}



export default function HomePage() {
    
    
    
    const homepage = getPageContentBySlug(['homepage']);
const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: homepage.jsonLd?.name || '',
        url: homepage.jsonLd?.url || '',
        description: homepage.jsonLd?.description || '',
    };

    
    
    
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <PageHero
                title={homepage.hero.title}
                subtitle={homepage.hero.subtitle}
                cta={homepage.hero.cta}
                ctaHref="/yiou-zhuce"
                useGateway={true}
            />

            {/* Content Part 1: Intro */}
            <div className="pt-16 pb-8 bg-[#0f172a]">
                <div className="max-w-4xl mx-auto px-4 content-area">
                    <div className="space-y-12 text-slate-300">
                        <section>
                            <h3 className="text-white text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-4">{homepage.intro.title}</h3>
                            {homepage.intro.content.map((paragraph, index) => (
                                <p key={index} className="leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: paragraph }} />
                            ))}
                        </section>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <QuickLinks />

            {/* Content Part 2: Features & Eco */}
            <div className="pt-8 pb-16 bg-[#0f172a]">
                <div className="max-w-4xl mx-auto px-4 content-area">
                    <div className="space-y-12 text-slate-300">
                        <section>
                            <h3 className="text-white text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-4">{homepage.features.title}</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                {homepage.features.items.map((feature, index) => (
                                    <div key={index} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                                        <h4 className="text-lg font-bold text-blue-400 mb-2">{feature.title}</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: feature.description }} />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {homepage.section3 && (
                            <section>
                                <h3 className="text-white text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-4">{homepage.section3.title}</h3>
                                <p className="leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: homepage.section3.content }} />
                            </section>
                        )}

                        <section>
                            <h3 className="text-white text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-4">{homepage.faq.title}</h3>
                            <div className="space-y-6">
                                {homepage.faq.items.map((faq, index) => (
                                    <div key={index} className="border-b border-slate-800 pb-6">
                                        <h4 className="text-white font-bold mb-3 flex items-center text-lg">
                                            <HelpCircle className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" /> {faq.question}
                                        </h4>
                                        <div className="text-slate-400 space-y-2 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
