import 'styles/globals.css'
import 'styles/common.scss'
import 'styles/tailwind.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import "slick-carousel/slick/slick.css" 
import "slick-carousel/slick/slick-theme.css"
import Header from 'components/Common/Header'
import Footer from 'components/Common/Footer'

// function App({ Component, pageProps }) {
//   return (
//     <>
//       <Header />
//       <Component {...pageProps} />
//       <Footer />
//     </>
//   )
// }

// export default App

/* From JDSports */
// import '../static/css/base.css'
// import '../static/css/tailwind.css'

import App from 'next/app'
import Head from 'next/head'
// import TagManager from 'react-gtm-module'
import MediaQuery from 'react-responsive'

import { StoreProvider } from 'easy-peasy'
import { postValidateCustomerToken, setDeviceId } from 'services/auth-service'
import store from 'store'

import AuthContextProvider from 'contexts/AuthContextProvider'
import Session from 'components/storage/storageComponent'
// import JDHeader from 'components/General/Header'
// import Footer from 'components/General/Footer'

// const tagManagerArgs = {
//   gtmId: 'GTM-M4HKVV',
// }

class MyApp extends App {
  async validateToken() {
    this.postValidateCustomerToken = postValidateCustomerToken
    try {
      const res = await this.postValidateCustomerToken()

      console.log('%c 🚀 res', 'color: green; font-weight: bold;', res)
    } catch (err) {
      console.error('%c ❌ err.response', 'color: red; font-weight: bold;', err.response)
    }
  }

  componentDidMount() {
    setDeviceId()
    // TagManager.initialize(tagManagerArgs)
  }

  render() {
    const { Component, pageProps } = this.props
    /*
    const polling = {
      url: `${process.env.HOST_URL}/api/v1/health`,
      interval: 30000,
    }
    */

    return (
      <StoreProvider store={store}>
        <AuthContextProvider>
          <MediaQuery MediaQuery minDeviceWidth={992}>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes, width=device-width"
              />
              <script
                type="text/javascript"
                src={process.env.MIDTRANS_SNAP}
                data-client-key={process.env.MIDTRANS_KEY}
              />
            </Head>

            {/* <Offline polling={polling}>
              <p
                className="text-center color-white mb-0 p-2 font-weight-bold"
                style={{ backgroundColor: '#f12727' }}
              >
                Koneksi anda terganggu, Mohon cek koneksi internet anda !!
              </p>
            </Offline> */}
          </MediaQuery>
          <MediaQuery maxDeviceWidth={991}>
            <Head>
              {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" /> */}
              <meta
                name="viewport"
                content="initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=no, width=device-width"
              />
            </Head>
            {/* <Offline polling={polling}>
              <p
                className="text-small text-center color-white mb-0 p-2 w-100"
                style={{ backgroundColor: '#f12727', position: 'fixed', zIndex: '99' }}
              >
                Koneksi anda terganggu, Mohon cek koneksi internet anda !!
              </p>
            </Offline> */}
          </MediaQuery>
          <Session />
          {/* <Header />
          <main className="relative lg:pt-[56px]">
            <Component pageProps={pageProps} />
          </main>
          <Footer /> */}
          <Header />
          <Component {...pageProps} />
          <Footer />
        </AuthContextProvider>
      </StoreProvider>
    )
  }
}

export default MyApp
