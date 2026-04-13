import { Metadata } from 'next';
import { getPageContentBySlug } from '@/lib/content';
import { SubPageLayout } from '@/components/SubPageLayout';




export async function generateMetadata(): Promise<Metadata> {
    const okbPage = getPageContentBySlug(['okb']);
    return {
        title: okbPage.metadata.title,
        description: okbPage.metadata.description,
        alternates: {
            canonical: 'https://yiouapp.com/okb/',
        },
    };
}

export default function OKBPage() {
    
    
    
    const okbPage = getPageContentBySlug(['okb']);
const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: okbPage.jsonLd?.name || '',
        url: okbPage.jsonLd?.url || '',
        description: okbPage.jsonLd?.description || '',
    };

    
    
    
    return (
        <SubPageLayout
            content={okbPage}
            ctaHref="/yiou-zhuce"
            breadcrumbs={[
                { label: '首页', href: '/' },
                { label: 'OKB生态', href: '/okb' }
            ]}
        />
    );
}
