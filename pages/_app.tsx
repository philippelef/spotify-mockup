import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PlayProvider } from '../context/PlayContext'
import Layout from '../components/Layout'
import { FavProvider } from '../context/FavContext'
import Head from 'next/head'
import { useState } from 'react'
import { IsMobileProvider } from '../context/MobileContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayProvider>
      <FavProvider>
        <IsMobileProvider>
          <Layout>
            <Head>
              <title>Shotgun - Playlist</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </IsMobileProvider>
      </FavProvider>
    </PlayProvider >
  )
}

export default MyApp
