import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PlayProvider } from '../context/PlayContext'
import Layout from '../components/Layout'
import { FavProvider } from '../context/FavContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayProvider>
      <FavProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FavProvider>
    </PlayProvider >
  )
}

export default MyApp
