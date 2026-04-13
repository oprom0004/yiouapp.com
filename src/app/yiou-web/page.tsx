import { Metadata } from 'next';
import { getPageContentBySlug } from '@/lib/content';
import { SubPageLayout } from '@/components/SubPageLayout';




export async function generateMetadata(): Promise<Metadata> {
    const webPage = getPageContentBySlug(['yiou-web']);
    return {
        title: webPage.metadata.title,
        description: webPage.metadata.description,
        alternates: {
            canonical: 'https://yiouapp.com/',
        },
    };
}

export default function WebPage() {
    
    
    
    const webPage = getPageContentBySlug(['yiou-web']);
const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: webPage.jsonLd?.name || '',
        url: webPage.jsonLd?.url || '',
        description: webPage.jsonLd?.description || '',
    };

    
    
    
    return (
        <SubPageLayout
            content={webPage}
            ctaHref="/yiou-web"
            breadcrumbs={[
                { label: '首页', href: '/' },
                { label: '网页版', href: '/yiou-web' }
            ]}
        />
    );
}
