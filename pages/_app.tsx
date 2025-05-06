import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

// --- Constants and Helper Functions ---

const SESSION_STORAGE_KEY = 'comarketing_ref_code'; // Key for sessionStorage

// Helper function to get URL parameters (from the new script)
function getParameterByName(name: string, url = typeof window !== 'undefined' ? window.location.href : ''): string | null {
  if (!url) return null;
  name = name.replace(/[\\[\\]]/g, '\\\\$&'); // Escaped backslashes for regex in string
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\\\\+/g, ' ')); // Escaped backslash for regex in string
}

// Logic to track the VISIT via Webhook
async function sendRefVisitToWebhook(refCode: string | null) {
  // Only send if refCode was actually provided
  if (!refCode) return;

  console.log(`Tracking visit with ref: ${refCode}`);
  try {
    const response = await fetch('https://staging.comarketing.com/api/webhook', { // Webhook URL from the new script
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ref: refCode,
        eventType: 'visit'
      })
    });
    if (response.ok) {
      console.log('Visit tracked successfully:', await response.json());
    } else {
      console.error('Error tracking visit:', response.status, await response.text());
    }
  } catch (error) {
    console.error('Error sending visit tracking data:', error);
  }
}

// Logic to add ref code (from sessionStorage) to form submission
function addRefToFormSubmission(refCode: string | null) {
  // Only proceed if we have a ref code
  if (!refCode) {
     console.log('No ref code available (URL or sessionStorage). Form not modified.');
     return;
  }

  // Find the form element - ADJUST SELECTOR IF NEEDED
  const form = document.querySelector('form');
  if (!form) {
    console.log('No form found on this page.'); // Keep commented as per original script
    return;
  }

  console.log(`Form found. Adding submit listener to inject ref: ${refCode}`);
  // Define the listener function separately to potentially remove it later if needed, though not strictly necessary here.
  const submitListener = () => {
    // Check if the hidden field already exists
    if (!form.querySelector('input[name="referral_code"]')) {
       console.log(`Injecting hidden field 'referral_code': ${refCode}`);
       const hiddenInput = document.createElement('input');
       hiddenInput.type = 'hidden';
       // **IMPORTANT**: Coordinate this field name
       hiddenInput.name = 'referral_code';
       hiddenInput.value = refCode;
       form.appendChild(hiddenInput);
    } else {
       console.log('Hidden field "referral_code" already exists.');
    }
  };

  form.addEventListener('submit', submitListener, { capture: false });
}


// --- React Component ---

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Renamed and updated function based on the new script
    async function sendRefToWebhook() {
      try {
        const verifyId = getParameterByName('verifyId');
        if (verifyId) {
            console.log('verifyId parameter found:', verifyId);
            const verifyResponse = await fetch('https://staging.comarketing.com/api/webhook/verifyScript', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ verifyId: verifyId })
            });
            
            if (verifyResponse.ok) {
                const responseData = await verifyResponse.json();
                console.log('Verification Response:', responseData);
            } else {
                console.error('Error sending verification data:', verifyResponse.status);
            }
            return; // Exit if verifyId was processed
        }

        const ref = getParameterByName('ref');
        if (!ref) {
            console.log('The "ref" parameter was not found in the URL (and no verifyId was present).');
            return;
        }

        console.log('ref parameter found (and no verifyId was present):', ref);
        const response = await fetch('https://staging.comarketing.com/api/webhook/conversion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ref: ref })
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Server Response (for ref):', responseData);
        } else {
            console.error('Error sending ref data:', response.status);
        }
      } catch (error) {
          console.error('Error in tracking script execution:', error);
      }
    }

    // Execute the function (equivalent to DOMContentLoaded)
    sendRefToWebhook();

  }, []); // Empty dependency array ensures this runs once per page load on the client

  return <Component {...pageProps} />
}

export default MyApp
