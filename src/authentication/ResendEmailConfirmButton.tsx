import React from 'react';
import { sendEmailConfirmCode } from '/src/authentication/SendEmailConfirmCode.tsx';

interface ResendEmailConfirmButtonProps {
  email: string;
  className?: string;
}

const ResendEmailConfirmButton: React.FC<ResendEmailConfirmButtonProps> = ({ email, className = '' }) => {
  return (
    <button 
      onClick={() => sendEmailConfirmCode(email)}
      className={`inline-flex items-center justify-center rounded-md border border-primary bg-primary px-6 py-2.5 text-center font-medium text-white hover:bg-opacity-90 transition-colors duration-200 ${className}`}
    >
      <span className="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      </span>
      Resend Confirmation
    </button>
  );
};

export default ResendEmailConfirmButton;