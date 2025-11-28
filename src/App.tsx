import React, { useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import ShopPage from './components/pages/ShopPage';
import ProductDetailPage from './components/pages/ProductDetailPage';
import AboutPage from './components/pages/AboutPage';
import GalleryPage from './components/pages/GalleryPage';
import BlogPage from './components/pages/BlogPage';
import BlogDetailPage from './components/pages/BlogDetailPage';
import TestimonialsPage from './components/pages/TestimonialsPage';
import CartPage from './components/pages/CartPage';
import CheckoutPage from './components/pages/CheckoutPage';
import PolicyPage from './components/pages/PolicyPage';
import WishlistPage from './components/pages/WishlistPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import WhatsAppButton from './components/ui/WhatsAppButton';
import ContactPage from './components/pages/ContactPage';
import FAQPage from './components/pages/FAQPage';
import AccountPage from './components/pages/AccountPage';
import LoyaltyPage from './components/pages/LoyaltyPage';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import { NotificationProvider } from './contexts/NotificationContext';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};

const pageTransition = {
  type: "tween" as const,
  ease: "anticipate" as const,
  duration: 0.5
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isAdmin } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className="flex-grow">
                <AnimatedRoutes />
            </main>
            <Footer />
            <WhatsAppButton />
        </>
    )
}

const AnimatedRoutes = () => {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
                <Route path="/shop" element={<PageWrapper><ShopPage /></PageWrapper>} />
                <Route path="/product/:id" element={<PageWrapper><ProductDetailPage /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
                <Route path="/gallery" element={<PageWrapper><GalleryPage /></PageWrapper>} />
                <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
                <Route path="/blog/:id" element={<PageWrapper><BlogDetailPage /></PageWrapper>} />
                <Route path="/testimonials" element={<PageWrapper><TestimonialsPage /></PageWrapper>} />
                <Route path="/cart" element={<PageWrapper><CartPage /></PageWrapper>} />
                <Route path="/checkout" element={
                    <ProtectedRoute>
                        <PageWrapper><CheckoutPage /></PageWrapper>
                    </ProtectedRoute>
                } />
                <Route path="/policy" element={<PageWrapper><PolicyPage /></PageWrapper>} />
                <Route path="/wishlist" element={<PageWrapper><WishlistPage /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
                <Route path="/register" element={<PageWrapper><RegisterPage /></PageWrapper>} />
                <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
                <Route path="/faq" element={<PageWrapper><FAQPage /></PageWrapper>} />
                <Route path="/loyalty" element={<PageWrapper><LoyaltyPage /></PageWrapper>} />
                <Route path="/account" element={
                    <ProtectedRoute>
                        <PageWrapper><AccountPage /></PageWrapper>
                    </ProtectedRoute>
                } />
            </Routes>
        </AnimatePresence>
    );
};

const PageWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
    >
        {children}
    </motion.div>
);

function App() {
  useEffect(() => {
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    
    window.addEventListener('resize', setAppHeight);
    setAppHeight(); // Set initial height
    
    return () => {
      window.removeEventListener('resize', setAppHeight);
    };
  }, []);
  
  return (
    <AuthProvider>
      <DataProvider>
        <NotificationProvider>
        <CartProvider>
            <WishlistProvider>
            <HashRouter>
                <div className="bg-brand-light font-sans text-brand-dark min-h-dynamic-screen flex flex-col w-full overflow-x-hidden">
                    <Routes>
                        {/* Admin Routes - The '/*' is CRITICAL for nested routes in AdminLayout */}
                        <Route path="/admin/*" element={
                            <ProtectedAdminRoute>
                                <AdminLayout />
                            </ProtectedAdminRoute>
                        } />

                        {/* Customer Routes */}
                        <Route path="/*" element={<MainLayout />} />
                    </Routes>
                </div>
            </HashRouter>
            </WishlistProvider>
        </CartProvider>
        </NotificationProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;