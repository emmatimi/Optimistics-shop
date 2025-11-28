
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage: React.FC = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

    return (
        <div className="bg-brand-light min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-serif font-bold text-brand-dark mb-8 text-center">Your Shopping Cart</h1>

                {cartCount === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg shadow-md">
                        <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
                        <Button to="/shop" variant="primary">Continue Shopping</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                            <AnimatePresence>
                                {cartItems.map(item => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                                        className="flex items-center justify-between py-4 border-b last:border-b-0"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                            <div>
                                                <Link to={`/product/${item.productId || item.id}`} className="font-semibold text-brand-dark hover:text-brand-primary">{item.name}</Link>
                                                <p className="text-sm text-gray-500">{item.size}</p>
                                                <p className="text-sm text-gray-500">{item.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>
                                                <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:underline mt-1">Remove</button>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                             <div className="flex items-center border rounded-md">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100">-</button>
                                                <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100">+</button>
                                            </div>
                                            <p className="font-semibold w-20 text-right">{(item.price * item.quantity).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div className="md:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                                <h2 className="text-xl font-semibold mb-4 border-b pb-4">Order Summary</h2>
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between">
                                        <span>Subtotal ({cartCount} items)</span>
                                        <span>{cartTotal.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="text-green-600">FREE</span>
                                    </div>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-4">
                                    <span>Total</span>
                                    <span>{cartTotal.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span>
                                </div>
                                <Button to="/checkout" variant="primary" className="w-full mt-6">
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;