import { toast } from 'react-hot-toast';


export const sendEmailConfirmCode = async (email: string) => {
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

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to resend confirmation email: ${error.message}`);
        }

        toast.success("Confirmation code has been sent.");
        const confirmCode = await response.json();
        console.log('for live testing of deployed demo, without emailsender switched in or access to terminal,  here is the confirmation code: ', confirmCode)
        
        
    } catch (error) {
        console.error("Unexpected error in resending confirmation email:", error);
        toast.error("An error occurred while sending confirmation email.");
    }
};