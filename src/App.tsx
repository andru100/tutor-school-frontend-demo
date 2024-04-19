import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudentProvider } from '/src/dashboard/context/StudentContext.tsx';
import { TeacherProvider } from '/src/dashboard/context/TeacherContext.tsx';

const DefaultLayout = lazy(() => import('./dashboard/layout/DefaultLayout.tsx'));

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        <StudentProvider>
          <TeacherProvider>
            <Router>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/*" element={<DefaultLayout />} />
                  {/* Add more routes as needed */}
                </Routes>
              </Suspense>
            </Router>
            <Toaster />
          </TeacherProvider>
        </StudentProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;