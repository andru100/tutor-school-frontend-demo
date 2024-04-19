import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { StudentUpdatesContext, StudentContextType } from '/src/dashboard/context/StudentContext.tsx';
import { TeacherUpdatesContext, TeacherContextType } from '/src/dashboard/context/TeacherContext.tsx';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS
  const [role, setRole] = useState('');
  const { setStudentData } = useContext(StudentUpdatesContext);
  const { setTeacherData } = useContext(TeacherUpdatesContext);


  const fetchTeacherData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken') || null;
      const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS

      const response = await fetch( serverAddress + "/api/query/getTeacher", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.status === 200) {
        const data = await response.json();
        setTeacherData(data);
        console.log("Successfuly retrieved teacher data: ", data);
      } else {
        toast.error("Unable to retrieve teacher data");
        navigate('/signin');
      }
    } catch (error) {
      toast.error("Unable to retrieve teacher data");
      console.error("Error fetching teacher data:", error);
    }
  };

  const fetchStudentData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken') || null;
      const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS

      const response = await fetch( serverAddress + "/api/query/GetStudent", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          });

        if (response.status === 200) {
          const data = await response.json();
          setStudentData(data);
          console.log("use effect view student dash student data: ", data)
        } else {
          toast.error("Unable to retrieve student data, please sign in");
          navigate('/signin');
        }
    } catch (error) {
      toast.error("An error has occured, please sign in");
      console.error("Error fetching student data:", error);
      navigate('/signin');
    }
  }

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
        setRole(roleData.entrypoint);

        if (roleData.entrypoint === 'CreateRole') {
          navigate('/choose-subscription');
        } else if (roleData.entrypoint === 'ConfirmEmail') {
          navigate('/confirm-email');
        } else if (roleData.entrypoint === 'Teacher') {
          await fetchTeacherData()
          navigate('/teacher-dashboard');
        } else if (roleData.entrypoint === 'Student') {
          await fetchStudentData()
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
  }, []);


  return <>{children}</>;

};

export default ProtectedRoutes;
