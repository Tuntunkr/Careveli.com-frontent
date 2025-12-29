import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Hero = () => {
  return (
    <div className='relative w-full bg-[#f3f4f6] dark:bg-gray-900 pt-10 pb-20 px-8 sm:px-16 lg:px-24 overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute top-0 right-0 w-2/3 h-full bg-[#e5e7eb] dark:bg-gray-800 -skew-x-12 transform translate-x-1/3 z-0'></div>

      <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-10'>
        
        {/* Left Content */}
        <div className='w-full md:w-1/2 space-y-6'>
          {/* <div className='flex items-center gap-4'>
             <div className='p-2 bg-black dark:bg-white rounded-full'>
                <img src={assets.logo} className='w-6 h-6 invert dark:invert-0' alt="logo_icon" />
             </div>
             <p className='font-medium text-sm tracking-wide uppercase dark:text-gray-300'>Careveli Edition</p>
          </div> */}

          <h1 className='text-5xl lg:text-7xl font-prata text-gray-900 dark:text-white leading-[1.1]'>
            Elevate your <br />
            <span className='italic'>lifestyle</span>.
          </h1>
          
          <button className='mt-8 px-8 py-3 bg-transparent border border-black dark:border-white text-black dark:text-white rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 uppercase text-sm tracking-widest'>
            Shop Collection
          </button>
        </div>

        {/* Right Image with Newsletter Card Overlay */}
        <div className='w-full md:w-1/2 relative'>
           <img src={assets.hero_img} className='w-full h-[500px] object-cover rounded-xl shadow-2xl' alt="hero_model" />
        </div>
      
      </div>
    </div>
  )
}

export default Hero
