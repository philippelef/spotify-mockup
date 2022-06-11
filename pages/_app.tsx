import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PlayProvider } from '../context/PlayContext'
import Layout from '../components/Layout'
import { FavProvider } from '../context/FavContext'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayProvider>
      <FavProvider>
        <Layout>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </FavProvider>
    </PlayProvider >
  )
}

export default MyApp
