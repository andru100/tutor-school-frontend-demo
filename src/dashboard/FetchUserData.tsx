import toast from 'react-hot-toast';
import { handleFetchResponse } from '/src/handleErrors/FetchWithErrorHandling.tsx';

export const fetchTeacherData = async () => {
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
 
    return response;
  } catch (error) {
    toast.error("Unable to retrieve teacher data");
    console.error("Error fetching teacher data:", error);
    return null;
  }
};

export const fetchStudentData = async () => {

  try {
    const accessToken = localStorage.getItem('accessToken') || null;
    const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS;

    const response = await fetch(serverAddress + "/api/query/GetStudent", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response;
  } catch (error) {
    toast.error("An error has occurred, please sign in");
    console.error("Error fetching student data:", error);
    return null;
  }
};