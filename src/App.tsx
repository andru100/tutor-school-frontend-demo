import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {loadStripe} from '@stripe/stripe-js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const DefaultLayout = lazy(() => import('./dashboard/layout/DefaultLayout.tsx'));


function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/*" element={<DefaultLayout />} />
              {/* Add more routes as needed */}
            </Routes>
          </Suspense>
        </Router>
        <Toaster />
      </GoogleOAuthProvider>
    </>
  );
}
export default App;