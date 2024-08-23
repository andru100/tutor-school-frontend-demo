import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CancelButtonProps {
  className?: string;
}

const CancelButton: React.FC<CancelButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/signup')}
      className={`inline-flex items-center justify-center rounded-md border border-stroke bg-gray px-6 py-2.5 text-center font-medium text-black dark:border-strokedark dark:bg-meta-4 dark:text-white hover:bg-opacity-90 transition-colors duration-200 ${className}`}
    >
      <span className="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
      Cancel
    </button>
  );
};

export default CancelButton;