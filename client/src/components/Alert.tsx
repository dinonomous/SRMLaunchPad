// src/components/Alert.tsx
import React from 'react';

interface AlertProps {
  message: string;
  statusCode: number; // Use statusCode instead of 'type'
  type: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, statusCode, onClose }) => {
  // Map status codes to alert types
  const getAlertType = (status: number): 'info' | 'success' | 'warning' | 'error' => {
    if (status >= 200 && status < 300) {
      return 'success';
    } else if (status >= 300 && status < 400) {
      return 'info';
    } else if (status >= 400 && status < 500) {
      return 'warning';
    } else if (status >= 500) {
      return 'error';
    } else {
      return 'info';
    }
  }; 

  const alertType = getAlertType(statusCode);

  const alertClasses = {
    info: 'text-blue-800 bg-blue-50',
    success: 'text-green-800 bg-green-50',
    warning: 'text-yellow-800 bg-yellow-50',
    error: 'text-red-800 bg-red-50',
  };

  return (
    <div className={`flex z-50 items-center p-4 mb-4 rounded-lg ${alertClasses[alertType]} fixed top-2 left-2 right-2`} role="alert">
      <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span className="sr-only">Info</span>
      <div className="ms-3 text-sm font-medium">{message}</div>
      <button type="button" className="ms-auto -mx-1.5 -my-1.5 p-1.5 hover:bg-gray-200 inline-flex items-center justify-center h-8 w-8" onClick={onClose} aria-label="Close">
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  );
};

export default Alert;
