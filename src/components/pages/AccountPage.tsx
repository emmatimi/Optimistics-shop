
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const AccountPage: React.FC = () => {
    const { user, logout } = useAuth();
    const { orders } = useData();

    // Filter orders for the current user (if user ID matches or email matches for this simplified demo)
    const userOrders = orders.filter(order => order.userId === user?.id || order.customerEmail === user?.email);

    return (
        <div className="bg-brand-light min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.h1 
                        className="text-4xl font-serif font-bold text-brand-dark"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        My Account
                    </motion.h1>
                    <motion.p 
                        className="text-gray-600 mt-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Welcome back, {user?.name}!
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* User Details */}
                    <div className="space-y-6">
                        <motion.div 
                            className="bg-white p-6 rounded-lg shadow-md h-fit"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h2 className="text-xl font-semibold text-brand-dark mb-4">Account Details</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="font-medium">{user?.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{user?.email}</p>
                                </div>
                            </div>
                            <Button onClick={logout} variant="outline" className="w-full mt-6">Log Out</Button>
                        </motion.div>

                        {/* Loyalty Summary */}
                        <motion.div 
                            className="bg-brand-primary text-white p-6 rounded-lg shadow-md h-fit"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h2 className="text-xl font-semibold mb-2">Loyalty Points</h2>
                            <p className="text-3xl font-bold mb-1">{user?.loyaltyPoints || 0}</p>
                            <p className="text-sm opacity-90 mb-4">pts available</p>
                            <Link to="/loyalty" className="text-sm underline hover:text-brand-accent">View Rewards Program &rarr;</Link>
                        </motion.div>
                    </div>

                    {/* Order History */}
                    <motion.div 
                        className="md:col-span-2 bg-white p-6 rounded-lg shadow-md"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-xl font-semibold text-brand-dark mb-4">Order History</h2>
                        <div className="space-y-4">
                            {userOrders.length > 0 ? userOrders.map(order => (
                                <div key={order.id} className="border p-4 rounded-md">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-brand-primary">{order.id}</p>
                                            <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">{order.total.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>
                                            <span className={`inline-block mt-1 text-xs font-medium px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-600">
                                        <p>Items: {order.items.map(i => i.name).join(', ')}</p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-gray-600">You have not placed any orders yet.</p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
