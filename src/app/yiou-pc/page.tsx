import { Metadata } from 'next';
import { getPageContentBySlug } from '@/lib/content';
import { SubPageLayout } from '@/components/SubPageLayout';




export async function generateMetadata(): Promise<Metadata> {
    const pcPage = getPageContentBySlug(['yiou-pc']);
    return {
        title: pcPage.metadata.title,
        description: pcPage.metadata.description,
        alternates: {
            canonical: 'https://yiouapp.com/',
        },
    };
}

export default function PCPage() {
    
    
    
    const pcPage = getPageContentBySlug(['yiou-pc']);
const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: pcPage.jsonLd?.name || '',
        url: pcPage.jsonLd?.url || '',
        description: pcPage.jsonLd?.description || '',
    };

    
    
    
    return (
        <SubPageLayout
            content={pcPage}
            ctaHref="/yiou-xiazai"
            breadcrumbs={[
                { label: '首页', href: '/' },
                { label: '电脑版下载', href: '/yiou-pc' }
            ]}
        />
    );
}
