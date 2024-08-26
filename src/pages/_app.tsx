import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import { SalesProvider, UserProvider } from '@components';

import 'react-toastify/dist/ReactToastify.min.css';
import '@/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={poppins.className}>
      <Component {...pageProps} />
      <UserProvider />
      <SalesProvider />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeButton
        closeOnClick={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        className="px-4 mt-20"
        limit={3}
      />
    </main>
  );
}
