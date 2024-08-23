import { ResendRequest } from "/src/dashboard/types.tsx";
import toast from 'react-hot-toast';



const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS;

export async function sendPasswordResetCode(resendRequest: ResendRequest): Promise<boolean> {
  try {
    const response = await fetch(`${serverAddress}/api/account/forgotPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resendRequest)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to resend confirmation email: ${error.message}`);
    }
  
    toast.success("If an account exists, a reset code will be sent to the email address you provided.");
    //For live demo without access to terminal or email , the code is displayed in the console
    const confirmCode = await response.json();
    console.log('for live testing of deployed demo, without emailsender switched in or access to terminal,  here is the confirmation code: ', confirmCode)

    return true; 
  } catch (error) {
    toast.error("Error in sending reset request: ");
    console.error("Error in sending reset request, the error is : ", error);
  }
}
