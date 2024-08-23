import React from 'react';
import { sendPasswordResetCode } from '/src/authentication/SendPasswordResetCode.tsx'; // Adjust this import path as needed

interface ResendResetPasswordButtonProps {
  email: string;
  className?: string;
}

const ResendResetPasswordButton: React.FC<ResendResetPasswordButtonProps> = ({ email, className = '' }) => {
  const handleResetPassword = () => {
    const resendRequest = { Email: email };
    sendPasswordResetCode(resendRequest);
  };

  return (
    <button 
      onClick={handleResetPassword}
      className={`inline-flex items-center justify-center rounded-md border border-stroke bg-gray px-6 py-2.5 text-center font-medium text-black dark:border-strokedark dark:bg-meta-4 dark:text-white hover:bg-opacity-90 transition-colors duration-200 ${className}`}
    >
      <span className="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
      </span>
      Reset Password
    </button>
  );
};

export default ResendResetPasswordButton;