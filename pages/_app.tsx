import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script' // Import the Script component

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script 
        id="comarketing-pixel-script" // It's good practice to add an id
        src="https://storage.googleapis.com/comarketing-bucket/scripts/comarketing-pixel-staging.js" 
        strategy="afterInteractive" // Loads after the page is interactive
        // onError can be added here for error handling if the script fails to load
        // onLoad can be added here if you need to run code after the script has loaded
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
