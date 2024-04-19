import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken || !refreshToken) {
          navigate('/signin');
          return;
        }

        const roleCheck = await fetch(`${serverAddress}/api/query/checkrole`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const roleData = await roleCheck.json();
        console.log('role check response is', roleData);

        if (roleData.entrypoint === 'CreateRole') {
          navigate('/choose-subscription');
        } else if (roleData.entrypoint === 'ConfirmEmail') {
          navigate('/confirm-email');
        } else if (roleData.entrypoint === 'Teacher') {
          navigate('/teacher-dashboard');
        } else if (roleData.entrypoint === 'Student') {
          navigate('/student-dashboard');
        } else {
          toast.error('Please sign in');
          navigate('/signin');
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
        navigate('/signin');
      }
    };

    checkAuthStatus();
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoutes;