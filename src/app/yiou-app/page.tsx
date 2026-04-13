import { Metadata } from 'next';
import { getPageContentBySlug } from '@/lib/content';
import { SubPageLayout } from '@/components/SubPageLayout';




export async function generateMetadata(): Promise<Metadata> {
    const appPage = getPageContentBySlug(['yiou-app']);
    return {
        title: appPage.metadata.title,
        description: appPage.metadata.description,
        alternates: {
            canonical: 'https://yiouapp.com/',
        },
    };
}

export default function AppDownloadPage() {
    
    
    
    const appPage = getPageContentBySlug(['yiou-app']);
const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: appPage.jsonLd?.name || '',
        url: appPage.jsonLd?.url || '',
        description: appPage.jsonLd?.description || '',
    };

    
    
    
    return (
        <SubPageLayout
            content={appPage}
            ctaHref="/yiou-xiazai"
            breadcrumbs={[
                { label: '首页', href: '/' },
                { label: 'APP下载', href: '/yiou-app' }
            ]}
        />
    );
}
