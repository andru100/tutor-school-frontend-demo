import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const useFetchWithErrorHandling = () => {
  const navigate = useNavigate();

  const handleFetchResponse = async (response) => {
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
        navigate('/signin');
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
    }

    toast.error(errorMessage);
    return response;
  };

  return { handleFetchResponse };
};

export default useFetchWithErrorHandling;