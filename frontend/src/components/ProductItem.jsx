import React, { useContext } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import { Link } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets'

const ProductItem = ({ id, image, name, price, soldOut }) => {
    
    const {currency} = useContext(ShopContext);
    const [isZoomed, setIsZoomed] = React.useState(false);

  return (
    <>
    <div className='group block relative'>
      <Link to={`/product/${id}`}>
      <div className='relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-xl mb-3 aspect-[3/4]'>
        {/* Image */}
        <img className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out ${soldOut ? 'grayscale opacity-70' : ''}`} src={image[0]} alt="" />
        
        {/* Sold Out Badge */}
        {soldOut && (
             <div className="absolute top-2 left-2 bg-gray-800 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                Sold Out
             </div>
        )}

        {/* Floating Action Button (Cart) - appearing on hover */}
        <button className='absolute bottom-4 right-4 w-10 h-10 bg-white dark:bg-black rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10'>
            <img src={assets.cart_icon} className='w-4 h-4 dark:invert' alt="" />
        </button>
      </div>
      </Link>
      
      {/* Zoom Icon */}
      <button 
        onClick={(e) => {
            e.preventDefault();
            setIsZoomed(true);
        }}
        className='absolute top-2 right-2 p-2 bg-white/80 dark:bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hover:bg-white dark:hover:bg-black'
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-600 dark:text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
        </svg>
      </button>

      <Link className='space-y-1 block' to={`/product/${id}`}>
        <p className='text-[10px] text-gray-500 uppercase tracking-widest'>New Arrival</p>
        <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>{name}</p>
        <div className='flex items-center gap-2'>
            <p className='text-sm font-semibold'>{currency}{price}</p>
             {/* Rating Stars Mockup */}
             <div className='flex text-yellow-400 text-[10px]'>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
             </div>
        </div>
        {/* React Bite: User Count */}
        <p className='text-[10px] text-red-500 font-medium mt-1 flex items-center gap-1'>
            <span className='w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse'></span>
            {Math.floor(Math.random() * 200) + 50} people wished this
        </p>
      </Link>
    </div>

    {/* Zoom Modal */}
    {isZoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setIsZoomed(false)}>
            <div className="relative max-w-4xl max-h-[90vh] overflow-auto">
                <img src={image[0]} className="max-w-full max-h-[90vh] object-contain" alt={name} />
                <button 
                    onClick={() => setIsZoomed(false)}
                    className="absolute top-4 right-4 text-white p-2 bg-black/50 rounded-full hover:bg-black/70"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )}
    </>
  )
}

export default ProductItem
