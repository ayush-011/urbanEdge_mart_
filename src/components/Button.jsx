import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClasses = "px-6 py-3 text-sm uppercase tracking-widest font-medium transition-colors border outline-none inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-black text-white border-black hover:bg-transparent hover:text-black dark:bg-white dark:text-black dark:border-white dark:hover:bg-transparent dark:hover:text-white",
    secondary: "bg-transparent text-black border-black hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
