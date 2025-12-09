import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { LanguageProvider } from '@/context/LanguageContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Zimam Delivery</title>
        <meta name="description" content="Delivery app for Gulf drivers" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </>
  )
}
