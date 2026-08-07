import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';
import '../styles/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
