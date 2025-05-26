import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
