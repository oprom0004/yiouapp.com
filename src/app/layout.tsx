import { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from './providers';
import BackToTop from '@/components/BackToTop';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import { GatewayTrigger } from '@/features/DownloadGateway/GatewayContext';



export const metadata: Metadata = {
  metadataBase: new URL('https://yiouapp.com'),
  alternates: {
    canonical: '/',
  },
  title: '易欧APP下载中心 | 欧意OKX交易所最新官方网页入口',
  description: '2026最新易欧(原欧意OKX)官方直连网址。提供易欧交易所APP(安卓Android/苹果iOS)官方最新版下载、网页入口及Web3钱包注册使用保姆级教程。',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://yiouapp.com',
    siteName: '易欧网址导航',
    title: '易欧APP下载中心 | 欧意OKX交易所最新官方网页入口',
    description: '2026最新易欧(原欧意OKX)官方直连网址。提供易欧交易所APP(安卓Android/苹果iOS)官方最新版下载、网页入口及Web3钱包注册使用保姆级教程。',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased font-sans">
        <Providers>
          <Header />
          <main className="min-h-screen bg-[#0f172a]">
            {children}
          </main>
          <Footer />
          <BackToTop />
          <MobileStickyFooter>
            <GatewayTrigger className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center transition-colors shadow-lg">
              访问 OKX 官网
            </GatewayTrigger>
          </MobileStickyFooter>
        </Providers>
      </body>
    </html>
  );
}
