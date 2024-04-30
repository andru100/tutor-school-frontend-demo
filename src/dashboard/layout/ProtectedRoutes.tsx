import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Teacher, Student } from "./types"
import { UniversalContext } from '/src/dashboard/context/UniversalContext.tsx';
import {fetchStudentData} from '/src/dashboard/FetchUserData.tsx'

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS
  const { setRole, setTeacherData, setStudentData, setGoBackToDash}  = useContext(UniversalContext);

  const fetchTeacherData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken') || null;
      const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS;
  
      const response = await fetch(serverAddress + "/api/query/getTeacher", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      if (response.status === 200) {
        const data = await response.json();
        console.log("Successfully retrieved teacher data:", data);
        return data;
      } else {
        toast.error("Unable to retrieve teacher data");
        return null;
      }
    } catch (error) {
      toast.error("Unable to retrieve teacher data");
      console.error("Error fetching teacher data:", error);
      return null;
    }
  };

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
          navigate('/create-role');
        } else if (roleData.entrypoint === 'ConfirmEmail') {
          navigate('/confirm-email');
        } else if (roleData.entrypoint === 'Teacher') {
          const teacherData: Teacher = await fetchTeacherData()
          if (teacherData) {
            setTeacherData(teacherData);
            setGoBackToDash('/teacher-dashboard')
            navigate('/teacher-dashboard'); 
          } else {
            navigate('/signin');
          }
        } else if (roleData.entrypoint === 'Student') {
          const studentData: Student = await fetchStudentData()
          if (studentData) {
            setStudentData(studentData);
            setGoBackToDash('/student-dashboard')
            navigate('/student-dashboard'); 
          } else {
            navigate('/signin');
          }
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
