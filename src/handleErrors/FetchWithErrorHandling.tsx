import { toast } from 'react-hot-toast';
import { NavigateFunction } from 'react-router-dom'; 

export const handleFetchResponse = async (response: Response, navigate: NavigateFunction) => {
    if (response.ok) {
      return; 
    }
    console.log("response error code  is:", response.status)
    let errorMessage = "An error occurred. Please try again. If the problem persists, please contact support.";
  
    switch (response.status) {
      case 400:
        errorMessage = "Bad Request. Please check your input.";
        break;
      case 401:
        errorMessage = "Unauthorized: Please sign in.";
        toast.error(errorMessage);
        navigate('/signin');
        throw new Error(errorMessage);
      case 403:
        errorMessage = "You don't have sufficient privileges to perform this action.";
        break;
      case 404:
        errorMessage = "Not Found. The requested resource doesn't exist.";
        break;
      case 500:
        errorMessage = "Internal Server Error. Please try again later.";
        break;
    }
  
    toast.error(errorMessage);
    throw new Error(errorMessage);
};