import React from 'react';

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button
      type={type}
      className={`px-6 py-2.5 rounded-full font-medium
        ${bgColor} ${textColor}
        shadow-sm shadow-blue-600/20 hover:shadow-md hover:shadow-blue-600/30
        hover:brightness-105 active:brightness-95
        transition-all duration-150 ease-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;