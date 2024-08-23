import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UniversalProvider } from '/src/context/UniversalContext.tsx';
import Modal from 'react-modal';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout.tsx'));

function App() {
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        <UniversalProvider>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/*" element={<DefaultLayout />} />
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