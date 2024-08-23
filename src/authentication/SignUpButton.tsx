import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SignUpButtonProps {
  className?: string;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/signup')} 
      className={`inline-flex items-center justify-center rounded-md border border-stroke bg-gray px-6 py-2.5 text-center font-medium text-black dark:border-strokedark dark:bg-meta-4 dark:text-white hover:bg-opacity-90 transition-colors duration-200 ${className}`}
    >
      <span className="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
      </span>
      Sign Up
    </button>
  );
};

export default SignUpButton;