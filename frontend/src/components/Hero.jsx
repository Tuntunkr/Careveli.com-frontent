import React, { useState, useEffect } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => {
  // Hero banner images array - using dummy images for testing
  const heroImages = [
    assets.hero_img, // Original hero image
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop', // Fashion store
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop', // Lifestyle fashion
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop', // Shopping
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop', // Modern fashion
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
  }

  return (
    <div className='relative w-full bg-[#f3f4f6] dark:bg-gray-900 pt-10 pb-20 px-8 sm:px-16 lg:px-24 overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute top-0 right-0 w-2/3 h-full bg-[#e5e7eb] dark:bg-gray-800 -skew-x-12 transform translate-x-1/3 z-0'></div>

      <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-10'>
        
        {/* Left Content */}
        <div className='w-full md:w-1/2 space-y-6'>
          <h1 className='text-5xl lg:text-7xl font-prata text-gray-900 dark:text-white leading-[1.1]'>
            Elevate your <br />
            <span className='italic'>lifestyle</span>.
          </h1>
          
          <Link to="/collection">
            <button className='mt-8 px-8 py-3 bg-transparent border border-black dark:border-white text-black dark:text-white rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 uppercase text-sm tracking-widest'>
              Shop Collection
            </button>
          </Link>
        </div>

        {/* Right Image Carousel */}
        <div className='w-full md:w-1/2 relative'>
          <div className='relative w-full h-[500px] rounded-xl shadow-2xl overflow-hidden'>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={heroImages[currentIndex]}
                alt={`hero_slide_₹{currentIndex + 1}`}
                className='w-full h-full object-cover'
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 z-10'
              aria-label="Previous slide"
            >
              <svg className='w-6 h-6 text-gray-800 dark:text-gray-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 z-10'
              aria-label="Next slide"
            >
              <svg className='w-6 h-6 text-gray-800 dark:text-gray-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10'>
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ₹{
                    index === currentIndex
                      ? 'bg-white dark:bg-gray-200 w-8'
                      : 'bg-white/50 dark:bg-gray-500/50 hover:bg-white/75 dark:hover:bg-gray-400/75'
                  }`}
                  aria-label={`Go to slide ₹{index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default Hero
