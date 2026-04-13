import { Metadata } from 'next';
import { getPageContentBySlug } from '@/lib/content';
import { SubPageLayout } from '@/components/SubPageLayout';




export async function generateMetadata(): Promise<Metadata> {
    const walletPage = getPageContentBySlug(['yiou-wallet']);
    return {
        title: walletPage.metadata.title,
        description: walletPage.metadata.description,
        alternates: {
            canonical: 'https://yiouapp.com/',
        },
    };
}

export default function WalletPage() {
    
    
    
    const walletPage = getPageContentBySlug(['yiou-wallet']);
const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: walletPage.jsonLd?.name || '',
        url: walletPage.jsonLd?.url || '',
        description: walletPage.jsonLd?.description || '',
    };

    
    
    
    return (
        <SubPageLayout
            content={walletPage}
            ctaHref="/yiou-wallet"
            breadcrumbs={[
                { label: '首页', href: '/' },
                { label: 'Web3钱包', href: '/yiou-wallet' }
            ]}
        />
    );
}
