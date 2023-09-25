import '../styles/globals.scss';
import { Work_Sans, Source_Serif_4 } from 'next/font/google';
import { SITE_URL } from '@/constants';
import { Header } from '@/components/Header/Header/Header';
import { Footer } from '@/components/Footer/Footer/Footer';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL(SITE_URL),
};

const workSans = Work_Sans({
  variable: '--font-work-sans',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
});

const sourceSerif4 = Source_Serif_4({
  variable: '--font-source-serif-4',
  weight: ['400'],
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${workSans.variable} ${sourceSerif4.variable}`}>
      <body className='footer-to-bottom'>
        <div className='page flex-1'>
          <Header />
          {children}
        </div>

        <Footer />

        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/vs2015.min.css'
        />

        <Script id='gtm'>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PHWG9535');`}
        </Script>

        <noscript>
          <iframe
            title='gtm'
            src='https://www.googletagmanager.com/ns.html?id=GTM-PHWG9535'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
