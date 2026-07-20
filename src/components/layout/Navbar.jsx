import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMagnifyingGlass, HiShoppingBag, HiHeart, HiUser, HiBars3, HiXMark, HiSun, HiMoon, HiChevronDown, HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useDebounce } from '../../hooks/useHooks';
import { searchSuggestions } from '../../data/products';
import { categories } from '../../data/categories';
import { formatPrice } from '../../utils/helpers';
import { useScrollPosition } from '../../hooks/useHooks';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [megaOpen, setMegaOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const scrolled = useScrollPosition(50);
  const debouncedSearch = useDebounce(searchQuery, 200);
  const { count } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const suggestions = searchSuggestions(debouncedSearch);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setSearchOpen(false);
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (q) => {
    if (q.trim()) {
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const useTransparentHero = isHome && !scrolled;
  const iconHoverBg = useTransparentHero
    ? 'hover:bg-white/10'
    : 'hover:bg-gray-900/5 dark:hover:bg-white/10';

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        useTransparentHero
          ? 'bg-transparent text-white'
          : 'glass text-gray-900 dark:text-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button className={`lg:hidden p-2 rounded-full ${iconHoverBg} transition-colors`} onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <HiBars3 size={24} />
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
                <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${useTransparentHero ? 'hover:text-white/80' : 'hover:text-indigo-600 dark:hover:text-indigo-400'}`}>
                  Shop <HiChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 pt-2 w-[600px]"
                    >
                      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 grid grid-cols-2 gap-4">
                        {categories.slice(0, 8).map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/categories/${cat.id}`}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            onClick={() => setMegaOpen(false)}
                          >
                            <span className="text-2xl">{cat.icon}</span>
                            <div>
                              <p className="font-medium text-sm text-gray-900 dark:text-white">{cat.name}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/shop" className={`text-sm font-medium transition-colors ${useTransparentHero ? 'hover:text-white/80' : 'hover:text-indigo-600 dark:hover:text-indigo-400'}`}>All Products</Link>
              <Link to="/shop?filter=flash-sale" className={`text-sm font-medium transition-colors ${useTransparentHero ? 'hover:text-white/80' : 'hover:text-indigo-600 dark:hover:text-indigo-400'}`}>Flash Sale</Link>
              <Link to="/about" className={`text-sm font-medium transition-colors ${useTransparentHero ? 'hover:text-white/80' : 'hover:text-indigo-600 dark:hover:text-indigo-400'}`}>About</Link>
            </nav>

            <Link to="/" className="font-serif text-2xl md:text-3xl font-bold tracking-tight absolute left-1/2 -translate-x-1/2">
              UrbanEdge Mart
            </Link>

            <div className="flex items-center gap-1 md:gap-2">
              <div ref={searchRef} className="relative hidden md:block">
                <button onClick={() => setSearchOpen(!searchOpen)} className={`p-2.5 rounded-full ${iconHoverBg} transition-colors`} aria-label="Search">
                  <HiMagnifyingGlass size={20} />
                </button>
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden"
                    >
                      <div className="p-3">
                        <input
                          autoFocus
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                          placeholder="Search products..."
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      {suggestions.length > 0 && (
                        <div className="border-t border-gray-100 dark:border-gray-800">
                          {suggestions.map((s) => (
                            <Link
                              key={s.id}
                              to={`/product/${s.slug}`}
                              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <img src={s.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate text-gray-900 dark:text-white">{s.name}</p>
                                <p className="text-xs text-gray-500">{formatPrice(s.price)}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={toggleTheme} className={`p-2.5 rounded-full ${iconHoverBg} transition-colors`} aria-label="Toggle theme">
                {isDark ? <HiSun size={20} /> : <HiMoon size={20} />}
              </button>

              <Link to="/wishlist" className={`relative p-2.5 rounded-full ${iconHoverBg} transition-colors`} aria-label="Wishlist">
                <HiHeart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{wishlistItems.length}</span>
                )}
              </Link>

              <Link to="/cart" className={`relative p-2.5 rounded-full ${iconHoverBg} transition-colors`} aria-label="Cart">
                <HiShoppingBag size={20} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center">{count}</span>
                )}
              </Link>

              {isAuthenticated ? (
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className={`p-1 rounded-full ${iconHoverBg} transition-colors flex items-center`}
                    aria-label="Account menu"
                    aria-haspopup="true"
                    aria-expanded={userMenuOpen}
                  >
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white text-sm font-bold flex items-center justify-center shadow-sm shadow-teal-500/30">
                      {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-60 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                          <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.name || 'Welcome'}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                        <div className="p-2 space-y-0.5">
                          <Link
                            to="/profile"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <HiUser size={16} /> Profile
                          </Link>
                          <Link
                            to="/orders"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <HiShoppingBag size={16} /> Orders
                          </Link>
                          <Link
                            to="/wishlist"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <HiHeart size={16} /> Wishlist
                          </Link>
                          <div className="border-t border-gray-100 dark:border-gray-800 my-1.5" />
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                          >
                            <HiArrowRightOnRectangle size={16} /> Log out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login" className={`p-2.5 rounded-full ${iconHoverBg} transition-colors`} aria-label="Sign in">
                  <HiUser size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-gray-900 z-50 lg:hidden shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                <span className="font-serif text-xl font-bold text-gray-900 dark:text-white">UrbanEdge Mart</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu"><HiXMark size={24} className="text-gray-900 dark:text-white" /></button>
              </div>
              <nav className="p-4 space-y-1">
                {[{ to: '/', label: 'Home' }, { to: '/shop', label: 'Shop' }, { to: '/categories', label: 'Categories' }, { to: '/wishlist', label: 'Wishlist' }, { to: '/about', label: 'About' }, { to: '/contact', label: 'Contact' }].map((link) => (
                  <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-gray-900 dark:text-white transition-colors">
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-gray-100 dark:border-gray-800 my-2" />
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-gray-900 dark:text-white transition-colors">
                      <HiUser size={18} /> My Account
                    </Link>
                    <Link to="/orders" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-gray-900 dark:text-white transition-colors">
                      <HiShoppingBag size={18} /> Orders
                    </Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 font-medium text-red-600 dark:text-red-400 transition-colors">
                      <HiArrowRightOnRectangle size={18} /> Log out
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-gray-900 dark:text-white transition-colors">
                    <HiUser size={18} /> Sign in
                  </Link>
                )}
              </nav>
              <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <input
                  placeholder="Search products..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none"
                  onKeyDown={(e) => { if (e.key === 'Enter') { handleSearch(e.target.value); setMobileOpen(false); } }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}