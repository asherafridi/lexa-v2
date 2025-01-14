"use client"
import { usePathname } from 'next/navigation';
import React from 'react';

const Breadcrumb = () => {
  const pathname = usePathname();
  
  // Clean up pathname for breadcrumb display
  const formattedPath = pathname
    .split('/')
    .filter((path) => path)  // remove empty strings
    .map((path) => path.charAt(0).toUpperCase() + path.slice(1))  // capitalize first letter
    .join(' / ');

  return (
    <div className='text-xl hidden lg:block '>
      {formattedPath}
    </div>
  );
};

export default Breadcrumb;
