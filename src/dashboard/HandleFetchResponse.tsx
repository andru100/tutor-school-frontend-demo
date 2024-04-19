// utils.ts or wherever you prefer to keep utility functions

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export const handleFetchResponse = async (response: Response) => {

  const navigate = useNavigate();

  if (response.ok) {
    return response;
  }

  let errorMessage = "An error occurred. Please try again. If the problem persists, please contact support.";

  switch (response.status) {
    case 400:
      errorMessage = "Bad Request. Please check your input.";
      break;
    case 401:
      errorMessage = "Unauthorized: Please check your details.";
      navigate('/choose-subscription');
      break;
    case 403:
      errorMessage = "You don't have sufficient privileges to perform this action.";
      break;
    case 404:
      errorMessage = "Not Found. The requested resource doesn't exist.";
      break;
    case 500:
      errorMessage = "Internal Server Error. Please try again later.";
      break;
    // Add more cases as needed
  }

  toast.error(errorMessage);
  // Optionally, you can return or throw an error here
  throw new Error(errorMessage);
};