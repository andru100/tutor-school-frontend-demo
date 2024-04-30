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

        toast.success("If the email exists, a confirmation code has been sent.");
    } catch (error) {
        console.error("Unexpected error in resending confirmation email:", error);
        toast.error("An error occurred while resending confirmation email.");
    }
};