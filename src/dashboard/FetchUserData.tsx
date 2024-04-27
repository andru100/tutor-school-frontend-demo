import toast from 'react-hot-toast';

export const fetchTeacherData = async () => {
  try {
    console.log('fetchTeacher called');
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

  export const fetchStudentData = async () => {
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
          console.log("Successfully retrieved student data: ", data);
          return data
        } else {
          toast.error("Unable to retrieve student data, please sign in");
          return null
        }
    } catch (error) {
      toast.error("An error has occured, please sign in");
      console.error("Error fetching student data:", error);
      return null
    }
  }