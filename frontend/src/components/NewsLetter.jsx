import React from 'react'

const NewsLetter = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className='text-center py-20 px-4 bg-gray-50 dark:bg-gray-800 border-t border-b border-gray-100 dark:border-gray-700'>
      <p className='text-3xl font-prata font-medium text-gray-800 dark:text-white mb-4'>Subscribe now & get 20% off</p>
      <p className='text-gray-500 dark:text-gray-300 mb-8 max-w-xl mx-auto'>
        Be the first to know about new arrivals, sales, and exclusive offers. Join the Careveli community today.
      </p>
      
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 p-1 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 overflow-hidden'>
        <input className='w-full sm:flex-1 outline-none pl-6 py-3 bg-transparent text-gray-700 dark:text-white placeholder-gray-400' type="email" placeholder='Enter your email address' required/>
        <button type='submit' className='bg-black dark:bg-white text-white dark:text-black text-xs px-10 py-4 rounded-full uppercase tracking-wider font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors'>
            Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsLetter
