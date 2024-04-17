import { toast } from 'react-hot-toast';
import { handleFetchResponse } from '/src/dashboard/HandleFetchResponse.tsx';

// Utility function to resend the confirmation email
export const sendEmailConfirmCode = async (email: string, landingPage: (page: string) => void) => {
    try {
        const resendRequest = {
            email: email
        };
        const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS;
        const response = await fetch(`${serverAddress}/api/account/resendConfirmationEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resendRequest)
        });

        // If the response is not ok, handleFetchResponse will throw an error
        await handleFetchResponse(response, landingPage);

        console.log("Resend confirmation email successful:");
        toast.success("If the email exists, a confirmation code has been sent.");
    } catch (error) {
        console.error("Unexpected error in resending confirmation email:", error);
        toast.error("An error occurred while resending confirmation email.");
    }
};