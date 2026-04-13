import { Metadata } from 'next';
import { getPageContentBySlug } from '@/lib/content';
import { SubPageLayout } from '@/components/SubPageLayout';




export async function generateMetadata(): Promise<Metadata> {
    const androidPage = getPageContentBySlug(['yiou-app', 'android']);
    return {
        title: androidPage.metadata?.title || '',
        description: androidPage.metadata?.description || '',
        alternates: {
            canonical: 'https://yiouapp.com/',
        },
    };
}

export default function AndroidPage() {
    
    
    
    const androidPage = getPageContentBySlug(['yiou-app', 'android']);
const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: androidPage.jsonLd?.name || '',
        url: androidPage.jsonLd?.url || '',
        description: androidPage.jsonLd?.description || '',
    };

    
    
    
    return (
        <SubPageLayout
            content={androidPage}
            ctaHref="/yiou-xiazai"
            breadcrumbs={[
                { label: '首页', href: '/' },
                { label: 'APP下载', href: '/yiou-app' },
                { label: 'Android下载', href: '/yiou-app/android' }
            ]}
        />
    );
}
