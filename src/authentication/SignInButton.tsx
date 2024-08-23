import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SignInButtonProps {
  className?: string;
}

const SignInButton: React.FC<SignInButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/signin')} 
      className={`inline-flex items-center justify-center rounded-md border border-primary bg-primary px-6 py-2.5 text-center font-medium text-white hover:bg-opacity-90 transition-colors duration-200 ${className}`}
    >
      <span className="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
      </span>
      Sign In
    </button>
  );
};

export default SignInButton;