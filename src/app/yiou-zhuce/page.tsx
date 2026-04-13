import { Metadata } from 'next';
import { getPageContentBySlug } from '@/lib/content';
import { SubPageLayout } from '@/components/SubPageLayout';




export async function generateMetadata(): Promise<Metadata> {
    const registerPage = getPageContentBySlug(['yiou-zhuce']);
    return {
        title: registerPage.metadata.title,
        description: registerPage.metadata.description,
        alternates: {
            canonical: 'https://yiouapp.com/yiou-zhuce/',
        },
    };
}

export default function RegisterPage() {
    
    
    
    const registerPage = getPageContentBySlug(['yiou-zhuce']);
const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: registerPage.jsonLd?.name || '',
        url: registerPage.jsonLd?.url || '',
        description: registerPage.jsonLd?.description || '',
    };

    
    
    
    return (
        <SubPageLayout
            content={registerPage}
            ctaHref="/yiou-zhuce"
            breadcrumbs={[
                { label: '首页', href: '/' },
                { label: '注册教程', href: '/yiou-zhuce' }
            ]}
        />
    );
}
