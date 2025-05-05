import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

// --- Constants and Helper Functions ---

const SESSION_STORAGE_KEY = 'comarketing_ref_code'; // Key for sessionStorage

// Helper function to get URL parameters
function getParameterByName(name: string, url = typeof window !== 'undefined' ? window.location.href : ''): string | null {
  if (!url) return null; // Add check for server-side rendering or unavailable window
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
  if (!results) return null; // Not found
  if (!results[2]) return ''; // Found but no value
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
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
    // console.log('No form found on this page.'); // Keep commented as per original script
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

  // Remove previous listener if it exists (safety measure in React strict mode or HMR)
  // Note: This simple approach might not perfectly handle all re-render scenarios.
  // For robustness, consider storing the listener reference or using a different strategy.
  // form.removeEventListener('submit', submitListener); // Needs reference stability

  form.addEventListener('submit', submitListener, { capture: false });

  // Optional: Return a cleanup function for useEffect to remove listener on component unmount/re-render
  // return () => {
  //   if (form) {
  //     form.removeEventListener('submit', submitListener, { capture: false });
  //   }
  // };
}


// --- React Component ---

function MyApp({ Component, pageProps }: AppProps) {
  // Use useEffect to run the tracking logic on the client side after mount
  useEffect(() => {
    // --- Main execution flow (equivalent to DOMContentLoaded) ---
    let refCodeFromUrl = getParameterByName('ref'); // Check current URL for 'ref'
    let refCodeForForm: string | null = null; // This will hold the code to inject into the form

    // 1. Check URL for ref code?
    if (refCodeFromUrl) {
      console.log(`Ref code found in URL: ${refCodeFromUrl}. Storing in sessionStorage.`);
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, refCodeFromUrl);
        refCodeForForm = refCodeFromUrl; // Use this code for potential form on *this* page
        sendRefVisitToWebhook(refCodeFromUrl); // Track the initial visit
      } catch (e) {
          console.error("SessionStorage is unavailable or full.", e);
          refCodeForForm = refCodeFromUrl; // Still try to use it for the current page form if storage fails
          // Optionally send webhook even if storage fails?
          // sendRefVisitToWebhook(refCodeFromUrl); // Decided based on original script logic (only send if stored)
      }
    } else {
       console.log('No ref code in URL. Checking sessionStorage.');
       try {
           refCodeForForm = sessionStorage.getItem(SESSION_STORAGE_KEY);
            if (refCodeForForm) {
                 console.log(`Ref code retrieved from sessionStorage: ${refCodeForForm}`);
            } else {
                 console.log('No ref code found in sessionStorage.');
            }
       } catch (e) {
           console.error("Could not read from sessionStorage.", e);
       }
    }

    // 2. Attempt to find a form and add the submit listener
    const cleanupFormListener = addRefToFormSubmission(refCodeForForm);

    // Optional: Return cleanup function from useEffect
    // return () => {
    //   if (cleanupFormListener) {
    //     cleanupFormListener();
    //   }
    // };

  }, []); // Empty dependency array ensures this runs once per page load/navigation on the client

  return <Component {...pageProps} />
}

export default MyApp
