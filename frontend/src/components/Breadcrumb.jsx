import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/frontend_assets/assets';

const Breadcrumb = ({ category, subCategory, product }) => {
  return (
    <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium my-4 mt-0 uppercase'>
      <Link to='/' className='cursor-pointer hover:text-black dark:hover:text-white hover:underline transition-all'>HOME</Link>
      <img src={assets.dropdown_icon} className='h-3 -rotate-90 dark:invert' alt="" />
      
      {category ? (
          <>
            <Link to='/collection' className='cursor-pointer hover:text-black dark:hover:text-white hover:underline transition-all'>{category}</Link>
            <img src={assets.dropdown_icon} className='h-3 -rotate-90 dark:invert' alt="" />
          </>
      ) : (
        <span className='text-gray-800 dark:text-gray-200 font-bold'>Collection</span>
      )}

      {subCategory && (
        <>
           <Link to='/collection' className='cursor-pointer hover:text-black dark:hover:text-white hover:underline transition-all'>{subCategory}</Link>
           <img src={assets.dropdown_icon} className='h-3 -rotate-90 dark:invert' alt="" />
        </>
      )}

      {product && (
        <span className='text-gray-800 dark:text-gray-200 font-bold truncate max-w-[200px] sm:max-w-none'>{product}</span>
      )}
    </div>
  );
}

export default Breadcrumb;
