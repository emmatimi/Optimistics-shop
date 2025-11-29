
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const OrderSuccessPage: React.FC = () => {
    const location = useLocation();
    // Retrieve the order ID passed from the Checkout page
    const state = location.state as { orderId?: string } | null;

    // If a user tries to access this page directly without placing an order, redirect to shop
    if (!state?.orderId) {
        return <Navigate to="/shop" replace />;
    }

    return (
        <div className="bg-brand-light min-h-screen flex items-center justify-center py-12">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="max-w-lg mx-auto bg-white p-8 md:p-12 rounded-xl shadow-lg text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div 
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </motion.div>

                    <h1 className="text-3xl font-serif font-bold text-brand-dark mb-2">Thank You!</h1>
                    <p className="text-xl text-gray-600 mb-6">Your order has been placed successfully.</p>

                    <div className="bg-gray-50 rounded-lg p-4 mb-8 border border-gray-100">
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Order Number</p>
                        <p className="text-2xl font-bold text-brand-primary tracking-wider">{state.orderId}</p>
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        We've sent a confirmation email to you. We will notify you as soon as your package ships.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button to="/account" variant="outline">
                            View Order Status
                        </Button>
                        <Button to="/shop" variant="primary">
                            Continue Shopping
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
