import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = async () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-6 px-4 sm:px-10 font-medium bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-50">
      <Link to="/">
        <img src="https://careveli.com/cdn/shop/files/careveli_header_logo.png?height=104&v=1765841391" className="w-32 sm:w-40" alt="careveli_logo" />
      </Link>

      <ul className="hidden md:flex gap-8 text-sm text-gray-700 dark:text-gray-200">
        <NavLink to="/" className="flex flex-col items-center gap-1 group">
          <p className="font-prata tracking-wide group-hover:text-black dark:group-hover:text-white transition-colors">HOME</p>
          <hr className="w-0 bg-black dark:bg-white h-[1px] group-hover:w-full transition-all duration-300" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1 group">
          <p className="font-prata tracking-wide group-hover:text-black dark:group-hover:text-white transition-colors">COLLECTION</p>
          <hr className="w-0 bg-black dark:bg-white h-[1px] group-hover:w-full transition-all duration-300" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1 group">
          <p className="font-prata tracking-wide group-hover:text-black dark:group-hover:text-white transition-colors">ABOUT</p>
          <hr className="w-0 bg-black dark:bg-white h-[1px] group-hover:w-full transition-all duration-300" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1 group">
          <p className="font-prata tracking-wide group-hover:text-black dark:group-hover:text-white transition-colors">CONTACT</p>
          <hr className="w-0 bg-black dark:bg-white h-[1px] group-hover:w-full transition-all duration-300" />
        </NavLink>
        <NavLink to="/blog" className="flex flex-col items-center gap-1 group">
          <p className="font-prata tracking-wide group-hover:text-black dark:group-hover:text-white transition-colors">BLOG</p>
          <hr className="w-0 bg-black dark:bg-white h-[1px] group-hover:w-full transition-all duration-300" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
            )}
        </button>

        <div onClick={() => setShowSearch(true)} className="cursor-pointer hover:scale-110 transition-transform">
           <img src={assets.search_icon} className="w-5 dark:invert" alt="search_icon" />
        </div>

        <div className="group relative">
          <div onClick={() => (token ? null : navigate("/login"))} className="cursor-pointer hover:scale-110 transition-transform">
             <img src={assets.profile_icon} className="w-5 dark:invert" alt="profile_icon" />
          </div>
          {/* Dropdown menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 rounded shadow-xl border border-gray-100 dark:border-gray-700">
                <p onClick={() => navigate("/profile")} className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">My Profile</p>
                <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">Logout</p>
              </div>
            </div>
          )}
        </div>

        <Link to="/wishlist" className="relative group hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </Link>
        
        <Link to="/cart" className="relative hover:scale-110 transition-transform">
          <img src={assets.cart_icon} className="w-5 min-w-5 dark:invert" alt="cart_icon" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] dark:bg-white dark:text-black">
            {getCartCount()}
          </p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer md:hidden dark:invert" alt="menu_icon" />
      </div>

      {/* Sidebar menu for small screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white dark:bg-gray-900 transition-all z-50 ${visible ? "w-full" : "w-0"}`}>
        <div className="flex flex-col text-gray-600 dark:text-gray-300">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-6 cursor-pointer border-b dark:border-gray-800">
            <img src={assets.dropdown_icon} className="h-4 rotate-180 dark:invert" alt="dropdown_icon" />
            <p className="font-medium">Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-4 pl-8 border-b dark:border-gray-800 text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-4 pl-8 border-b dark:border-gray-800 text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" to="/collection">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-4 pl-8 border-b dark:border-gray-800 text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-4 pl-8 border-b dark:border-gray-800 text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" to="/contact">CONTACT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-4 pl-8 border-b dark:border-gray-800 text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" to="/blog">BLOG</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
