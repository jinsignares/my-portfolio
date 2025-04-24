import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

// Helper function to get URL parameters
function getParameterByName(name: string, url = window.location.href): string | null {
    name = name.replace(/[\[\]]/g, '\\$&')
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

function MyApp({ Component, pageProps }: AppProps) {
  // Use useEffect to run the tracking logic on the client side
  useEffect(() => {
    // Function to send the ref to the webhook
    async function sendRefToWebhook() {
        try {
            // Get the ref parameter from the URL
            const ref = getParameterByName('ref')

            // Check if the ref parameter exists
            if (!ref) {
                console.log('No ref parameter found in the URL')
                return
            }

            console.log('Ref parameter found:', ref)

            // Send the ref to the webhook via POST
            const response = await fetch('https://app.comarketing.com/api/webhook/conversion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ref: ref })
            })

            // Check the response
            if (response.ok) {
                const responseData = await response.json()
                console.log('Server response:', responseData)
            } else {
                console.error('Error sending data:', response.status)
            }
        } catch (error) {
            console.error('Error executing tracking:', error)
        }
    }

    // Execute the function
    sendRefToWebhook()
  }, []) // Empty dependency array ensures this runs only once on mount

  return <Component {...pageProps} />
}

export default MyApp
