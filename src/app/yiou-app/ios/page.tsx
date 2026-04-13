import { Metadata } from 'next';
import { getPageContentBySlug } from '@/lib/content';
import { SubPageLayout } from '@/components/SubPageLayout';




export async function generateMetadata(): Promise<Metadata> {
    const iosPage = getPageContentBySlug(['yiou-app', 'ios']);
    return {
        title: iosPage.metadata?.title || '',
        description: iosPage.metadata?.description || '',
        alternates: {
            canonical: 'https://yiouapp.com/',
        },
    };
}

export default function IOSPage() {
    
    
    
    const iosPage = getPageContentBySlug(['yiou-app', 'ios']);
const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: iosPage.jsonLd?.name || '',
        url: iosPage.jsonLd?.url || '',
        description: iosPage.jsonLd?.description || '',
    };

    
    
    
    return (
        <SubPageLayout
            content={iosPage}
            ctaHref="/yiou-xiazai"
            breadcrumbs={[
                { label: '首页', href: '/' },
                { label: 'APP下载', href: '/yiou-app' },
                { label: 'iOS教程', href: '/yiou-app/ios' }
            ]}
        />
    );
}
