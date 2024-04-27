import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UniversalProvider } from '/src/dashboard/context/UniversalContext.tsx';

const DefaultLayout = lazy(() => import('./dashboard/layout/DefaultLayout.tsx'));

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        <UniversalProvider>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/*" element={<DefaultLayout />} />
                {/* Add more routes as needed */}
              </Routes>
            </Suspense>
          </Router>
          <Toaster />
        </UniversalProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;