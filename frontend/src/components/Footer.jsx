import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 pt-20 pb-10 px-8 sm:px-16 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-14 mb-14">
        {/* Brand Section */}
        <div className="flex flex-col gap-6">
          <Link to="/">
             <img src="https://careveli.com/cdn/shop/files/careveli_header_logo.png?height=104&v=1765841391" className="w-40" alt="careveli_logo" />
          </Link>
          <p className="w-full md:w-3/4 text-gray-600 dark:text-gray-400 leading-relaxed font-light">
            Careveli is your premier destination for fashion that combines elegance, comfort, and sustainability. We are dedicated to providing you with the best shopping experience.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-prata font-medium mb-6 dark:text-white uppercase tracking-wider">Company</p>
          <ul className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-400 font-light">
            <li><Link to='/' className="hover:text-black dark:hover:text-white transition-colors hover:translate-x-1 inline-block duration-300">Home</Link></li>
            <li><Link to='/about' className="hover:text-black dark:hover:text-white transition-colors hover:translate-x-1 inline-block duration-300">About us</Link></li>
            <li><Link to='/contact' className="hover:text-black dark:hover:text-white transition-colors hover:translate-x-1 inline-block duration-300">Contact us</Link></li>
            <li><Link to='/privacy-policy' className="hover:text-black dark:hover:text-white transition-colors hover:translate-x-1 inline-block duration-300">Privacy policy</Link></li>
            <li><Link to='/terms' className="hover:text-black dark:hover:text-white transition-colors hover:translate-x-1 inline-block duration-300">Terms & Conditions</Link></li>
            <li><Link to='/shipping-policy' className="hover:text-black dark:hover:text-white transition-colors hover:translate-x-1 inline-block duration-300">Shipping Policy</Link></li>
            <li><Link to='/refund-policy' className="hover:text-black dark:hover:text-white transition-colors hover:translate-x-1 inline-block duration-300">Refund Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-prata font-medium mb-6 dark:text-white uppercase tracking-wider">Get in Touch</p>
          <ul className="flex flex-col gap-4 text-sm text-gray-600 dark:text-gray-400 font-light">
            <li className="flex items-start gap-3">
               <span className="mt-1 block w-2 h-2 rounded-full bg-black dark:bg-white flex-shrink-0"></span>
               <span>E-237 BM, Amar Colony, Lajpat Nagar, South Delhi, New Delhi - 110024</span>
            </li>
            <li className="flex items-center gap-3">
               <span className="block w-2 h-2 rounded-full bg-black dark:bg-white flex-shrink-0"></span>
               <span>+91 8959600600</span>
            </li>
            <li className="flex items-center gap-3">
               <span className="block w-2 h-2 rounded-full bg-black dark:bg-white flex-shrink-0"></span>
               <span>care@careveli.com</span>
            </li>
            <li className="flex items-center gap-4 mt-2">
                <a href="https://www.instagram.com/thecareveli/" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-black dark:hover:text-white font-medium flex items-center gap-2">
                    Instagram <span className="text-xs">↗</span>
                </a>
                <a href="https://www.facebook.com/people/Careveli/61585269587293/?rdid=fJo1uVT3UtUJ2AL6&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16v79NM2dE%2F" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-black dark:hover:text-white font-medium flex items-center gap-2">
                    Facebook <span className="text-xs">↗</span>
                </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t dark:border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-center text-gray-500 dark:text-gray-500 font-light tracking-wide">
          Copyright 2025 @ Careveli - All Right Reserved.
        </p>
        <div className="flex gap-4">
           {/* Payment Icons */}
           <img src={assets.razorpay_logo} alt="Razorpay" className="h-6 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
           <img src={assets.stripe_logo} alt="Stripe" className="h-6 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
