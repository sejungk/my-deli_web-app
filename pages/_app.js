import { useEffect } from 'react';
import { useRouter } from 'next/router';
import "../app/globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })
// export default ({ Component, pageProps }) => {
//   return <Component {...pageProps} />;
// };


export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      // Apply the Inter font to the body element
      document.body.classList.add(inter.className);
    };

    const handleRouteComplete = () => {
      // Remove the Inter font class from the body element after the route change is complete
      document.body.classList.remove(inter.className);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteComplete);
    };
  }, []);

  return <Component {...pageProps} />;
}
