import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Teacher, Student } from "./types"
import { UniversalContext } from '/src/context/UniversalContext.tsx';
import {fetchTeacherData, fetchStudentData} from '/src/dashboard/FetchUserData.tsx'
import { handleFetchResponse } from '/src/handleErrors/FetchWithErrorHandling.tsx';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS
  const { setRole, setTeacherData, setStudentData}  = useContext(UniversalContext);

  useEffect(() => {
  const checkAuthStatus = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        navigate('/signin');
        return;
      }

      const response = await fetch(`${serverAddress}/api/query/checkrole`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      await handleFetchResponse(response, navigate);
      const roleData = await response.json();
      console.log('role check response is', roleData);
      setRole(roleData.entrypoint);
        
      switch (roleData.entrypoint) {
        case 'CreateRole':
          navigate('/create-role');
          break;
        case 'ConfirmEmail':
          //TODO check uneeded and delete
          navigate('/confirm-email' ) // this page needs prop with email but technically cant happen because to view protected routs you have to be registere  , { state: { email: loginData.email } });
          break;
        case 'Teacher':
          console.log("fetching teacher data")
          const teacherResponse = await fetchTeacherData();
          console.log("response recieved")
          await handleFetchResponse(teacherResponse, navigate);
          console.log("running handleFetchResponse any errors should be thrown")
          const teacherData: Teacher = await teacherResponse.json();
          console.log("converted to json", teacherData, "now setting teacherData state")
          setTeacherData(teacherData);
          navigate('/teacher-dashboard'); 
          break;
        case 'Student':
          const studentResponse = await fetchStudentData();
          await handleFetchResponse(studentResponse, navigate);
          const studentData: Student = await studentResponse.json();
          console.log("Successfully retrieved student data:", studentData);
          setStudentData(studentData);
          navigate('/student-dashboard'); 
          break;
        default:
          console.error("Unknown role entrypoint");
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
