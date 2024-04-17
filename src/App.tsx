import { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {loadStripe} from '@stripe/stripe-js';



const DefaultLayout = lazy(() => import('./dashboard/layout/DefaultLayout.tsx'));


function App() {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PROMISE);

  return(
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        <Toaster/>
        <DefaultLayout/>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;