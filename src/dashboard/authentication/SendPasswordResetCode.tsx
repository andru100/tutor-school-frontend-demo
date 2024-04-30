import { ResendRequest } from "/src/dashboard/types.tsx";
import toast from 'react-hot-toast';
import useFetchWithErrorHandling from '/src/dashboard/hooks/useFetchWithErrorHandling.tsx';


const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS;

export async function sendPasswordResetCode(resendRequest: ResendRequest): Promise<boolean> {
  const { handleFetchResponse } = useFetchWithErrorHandling();
  try {
    const response = await fetch(`${serverAddress}/api/account/forgotPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resendRequest)
    });

    await handleFetchResponse(response);
  
    toast.success("If an account exists, a reset code will be sent to the email address you provided.");
    return true; 
  } catch (error) {
    toast.error("Error in sending reset request: ");
    console.error("Error in sending reset request, the error is : ", error);
  }

}