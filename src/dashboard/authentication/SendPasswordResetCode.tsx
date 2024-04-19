import { ResendRequest } from "/src/dashboard/types.tsx";
import toast from 'react-hot-toast';
import useFetchWithErrorHandling from '/src/dashboard/hooks/useFetchWithErrorHandling.tsx';


const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS;

export async function sendPasswordResetCode(resendRequest: ResendRequest): Promise<boolean> {
  const { handleFetchResponse } = useFetchWithErrorHandling();
  try {
    console.log("sending reset request. logindata in sendPasswordResetCode is: " + resendRequest.email) 
    const response = await fetch(`${serverAddress}/api/account/forgotPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resendRequest)
    });

    // If the response is not ok, handleFetchResponse will throw an error
    await handleFetchResponse(response);
  
    toast.success("If an account exists, a reset code will be sent to the email address you provided.");
    return true; // Request was successful
  } catch (error) {
    toast.error("Error in sending reset request: ");
    console.error("Error in sending reset request, the error is : ", error);
    // Check if the error message is related to a 400 status code
    // if (error instanceof Error && error.message.includes("Bad Request")) {
    //   toast.error("Error in sign up. Please check that you have entered a valid email address and password. If you think you may have already registered, please try to sign in.");
    // }
    // The error message has already been displayed by handleFetchResponse for other errors
  }

}