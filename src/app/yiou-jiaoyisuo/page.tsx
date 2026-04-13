import { Metadata } from 'next';
import { getPageContentBySlug } from '@/lib/content';
import { SubPageLayout } from '@/components/SubPageLayout';




export async function generateMetadata(): Promise<Metadata> {
    const aboutPage = getPageContentBySlug(['yiou-jiaoyisuo']);
    return {
        title: aboutPage.metadata.title,
        description: aboutPage.metadata.description,
        alternates: {
            canonical: 'https://yiouapp.com/',
        },
    };
}

export default function AboutPage() {
    
    
    
    const aboutPage = getPageContentBySlug(['yiou-jiaoyisuo']);
const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: aboutPage.jsonLd?.name || '',
        url: aboutPage.jsonLd?.url || '',
        description: aboutPage.jsonLd?.description || '',
    };

    
    
    
    return (
        <SubPageLayout
            content={aboutPage}
            breadcrumbs={[
                { label: '首页', href: '/' },
                { label: '易欧交易所', href: '/yiou-jiaoyisuo' }
            ]}
        />
    );
}
