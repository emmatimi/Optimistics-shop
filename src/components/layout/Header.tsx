
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const WishlistIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const NavItem: React.FC<{ to: string, children: React.ReactNode, onClick?: () => void }> = ({ to, children, onClick }) => (
    <NavLink 
        to={to} 
        onClick={onClick}
        className={({ isActive }) => 
            `block md:inline-block px-3 py-2 text-sm font-medium transition-colors duration-300 border-b-2 ${isActive ? 'border-brand-primary text-brand-primary font-semibold' : 'border-transparent text-brand-dark hover:text-brand-primary'}`
        }
    >
        {children}
    </NavLink>
);

const Header: React.FC = () => {
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const { isAuthenticated, isAdmin, user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/');
    };

    const navLinks = [
        { to: '/', text: 'Home' },
        { to: '/shop', text: 'Shop' },
        { to: '/about', text: 'About' },
        { to: '/gallery', text: 'Results' },
        { to: '/blog', text: 'Blog' },
        { to: '/testimonials', text: 'Testimonials' },
    ];
    
    return (
        <header className="bg-brand-secondary/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center min-w-0 mr-2">
                        <Link to="/" className="flex items-center space-x-1 sm:space-x-2 truncate">
                            <LeafIcon />
                            <span className="font-serif text-lg sm:text-xl font-bold text-brand-primary truncate">Optimistics Naturals</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center flex-grow justify-center px-4">
                        <div className="flex items-baseline space-x-1 lg:space-x-4">
                            {navLinks.map(link => (
                                <NavItem key={link.to} to={link.to}>{link.text}</NavItem>
                            ))}
                            {isAdmin && (
                                <NavLink 
                                    to="/admin" 
                                    className="block md:inline-block px-3 py-2 text-sm font-bold text-white bg-brand-primary rounded hover:bg-opacity-90 transition-colors"
                                >
                                    Dashboard
                                </NavLink>
                            )}
                        </div>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center flex-shrink-0">
                        {/* Auth Buttons - Desktop Only to save space */}
                        {isAuthenticated ? (
                             <div className="hidden lg:flex items-center space-x-2 md:space-x-4 ml-2">
                                <span className="text-sm">Hi, {user?.name?.split(' ')[0]}</span>
                                <Button onClick={handleLogout} variant="outline" className="text-xs px-3 py-1">Logout</Button>
                            </div>
                        ) : (
                            <div className="hidden lg:block ml-4">
                               <Button to="/login" variant="primary" className="text-xs px-4 py-2">Login</Button>
                            </div>
                        )}

                        {/* Wishlist */}
                        <Link to="/wishlist" className="relative text-brand-dark hover:text-brand-primary p-1 sm:p-2 ml-1 sm:ml-2">
                            <WishlistIcon />
                            {wishlistCount > 0 && (
                                <motion.span 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className="absolute top-0 right-0 block h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-brand-accent text-white text-[10px] sm:text-xs flex items-center justify-center"
                                >
                                    {wishlistCount}
                                </motion.span>
                            )}
                        </Link>

                        {/* Cart */}
                        <Link to="/cart" className="relative text-brand-dark hover:text-brand-primary p-1 sm:p-2">
                            <CartIcon />
                            {cartCount > 0 && (
                                <motion.span 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className="absolute top-0 right-0 block h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-brand-accent text-white text-[10px] sm:text-xs flex items-center justify-center"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </Link>

                        {/* Mobile/Tablet Menu Trigger */}
                        <div className="lg:hidden ml-1 sm:ml-2">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1 sm:p-2 rounded-md text-brand-dark hover:text-brand-primary focus:outline-none">
                                {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
             <AnimatePresence>
            {isMenuOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="lg:hidden bg-brand-secondary"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {isAdmin && (
                            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-brand-primary font-bold">Admin Dashboard</Link>
                        )}
                        {navLinks.map(link => (
                            <NavItem key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)}>{link.text}</NavItem>
                        ))}
                        <div className="border-t my-2 mx-3"></div>
                        {isAuthenticated ? (
                            <>
                                <NavItem to="/account" onClick={() => setIsMenuOpen(false)}>My Account</NavItem>
                                <div className="px-3 py-2 text-sm">Hi, {user?.name}</div>
                                <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-sm font-medium text-brand-dark hover:text-brand-primary">Logout</button>
                            </>
                        ) : (
                            <NavItem to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavItem>
                        )}
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
