import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiShoppingBag, FiMenu, FiSearch, FiX, FiUser } from 'react-icons/fi';
import { toggleCart } from '../store/cartSlice';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate('/shop');
      alert(`Searching for: ${searchQuery} (Mock redirect to shop)`);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'py-4 glass' : 'py-6 bg-transparent text-gray-900 dark:text-white'}`}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <button className="md:hidden text-2xl" onClick={() => setIsMobileMenuOpen(true)}>
            <FiMenu />
          </button>

          <div className="hidden md:flex gap-8 flex-1">
            <Link to="/shop" className="text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">Shop</Link>
            <Link to="/collections" className="text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">Collections</Link>
            <Link to="/about" className="text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">Our Story</Link>
          </div>

          <Link to="/" className="font-serif text-2xl tracking-[0.1em] font-medium flex-1 text-center">
            AURA
          </Link>

          <div className="flex items-center justify-end gap-6 flex-1">
            <Link to="/auth" className="hidden md:block text-xl hover:opacity-70 transition-opacity">
              <FiUser />
            </Link>
            <button className="hidden md:block text-xl hover:opacity-70 transition-opacity" onClick={() => setIsSearchOpen(true)}>
              <FiSearch />
            </button>
            <button className="relative text-xl hover:opacity-70 transition-opacity" onClick={() => dispatch(toggleCart())}>
              <FiShoppingBag />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold h-4 min-w-[16px] rounded-full flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <div className={`fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-md z-50 transition-opacity duration-300 flex flex-col justify-center items-center ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button className="absolute top-8 right-8 text-3xl hover:opacity-70" onClick={() => setIsSearchOpen(false)}>
          <FiX />
        </button>
        <form onSubmit={handleSearch} className="w-full max-w-3xl px-4 flex items-center border-b-2 border-black dark:border-white pb-4">
          <FiSearch className="text-3xl mr-4" />
          <input 
            type="text" 
            placeholder="Search for products, brands, etc..." 
            className="w-full bg-transparent text-3xl md:text-5xl font-serif outline-none placeholder-gray-400 dark:placeholder-gray-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus={isSearchOpen}
          />
        </form>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white dark:bg-black z-[100] flex flex-col p-8 transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-12">
          <span className="font-serif text-2xl">AURA</span>
          <button className="text-2xl" onClick={() => setIsMobileMenuOpen(false)}>
            <FiX />
          </button>
        </div>
        <div className="flex flex-col gap-8">
          <Link to="/" className="font-serif text-4xl hover:opacity-70" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/shop" className="font-serif text-4xl hover:opacity-70" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
          <Link to="/collections" className="font-serif text-4xl hover:opacity-70" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
          <Link to="/about" className="font-serif text-4xl hover:opacity-70" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
          <Link to="/auth" className="font-serif text-4xl hover:opacity-70 mt-12" onClick={() => setIsMobileMenuOpen(false)}>Account</Link>
        </div>
      </div>
    </>
  );
}
