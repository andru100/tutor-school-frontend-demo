import React from 'react';
import { sendPasswordResetCode } from './SendPasswordResetCode';

export const ResendPasswordResetButton: React.FC<{ email: string, landingPage: (page: string) => void }> = ({ email, landingPage }) => {

    const handleResetPassword = () => {
        const resendRequest = { Email: email };
        sendPasswordResetCode(resendRequest, landingPage);
    };

    return (
        <button onClick={handleResetPassword} className="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
            Reset Password
        </button>
    );
};