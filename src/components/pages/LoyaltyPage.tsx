
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const LoyaltyPage: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    
    // Determine Tier based on points
    const points = user?.loyaltyPoints || 0;
    let tier = 'Seedling';
    let nextTier = 'Blossom';
    let pointsToNext = 1000 - points;
    let progress = (points / 1000) * 100;
    let tierColor = 'text-green-600';

    if (points >= 1000 && points < 5000) {
        tier = 'Blossom';
        nextTier = 'Radiant';
        pointsToNext = 5000 - points;
        progress = ((points - 1000) / 4000) * 100;
        tierColor = 'text-pink-500';
    } else if (points >= 5000) {
        tier = 'Radiant';
        nextTier = 'Max Level';
        pointsToNext = 0;
        progress = 100;
        tierColor = 'text-purple-600';
    }

    return (
        <div className="bg-brand-light min-h-screen">
            <div className="bg-brand-secondary text-center py-16">
                <motion.h1 
                    className="text-4xl md:text-5xl font-serif font-bold text-brand-primary"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Optimistics Rewards
                </motion.h1>
                <motion.p 
                    className="mt-4 text-lg text-brand-dark max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    The more you glow, the more you earn!
                </motion.p>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* Dashboard for Logged In Users */}
                {isAuthenticated ? (
                     <motion.div 
                        className="bg-white rounded-xl shadow-lg p-8 mb-12 max-w-4xl mx-auto border border-gray-100"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                     >
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                            <div className="text-center md:text-left mb-4 md:mb-0">
                                <p className="text-gray-500 text-sm uppercase tracking-wide">Current Balance</p>
                                <h2 className="text-5xl font-bold text-brand-dark">{points.toLocaleString()} <span className="text-2xl text-gray-400 font-normal">pts</span></h2>
                            </div>
                            <div className="text-center md:text-right">
                                <p className="text-gray-500 text-sm uppercase tracking-wide">Current Tier</p>
                                <h2 className={`text-3xl font-serif font-bold ${tierColor}`}>{tier}</h2>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        {tier !== 'Radiant' && (
                            <div className="mb-8">
                                <div className="flex justify-between text-sm mb-2 text-gray-600">
                                    <span>{tier}</span>
                                    <span>{pointsToNext} pts to {nextTier}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div className="bg-brand-primary h-4 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>
                        )}

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="font-bold text-brand-dark mb-2">How to Redeem</h3>
                            <p className="text-gray-600 text-sm">
                                You can redeem your points during checkout. Every 100 points = ₦100 discount. Look for the "Redeem Points" option on the checkout page (Coming Soon).
                            </p>
                        </div>
                     </motion.div>
                ) : (
                    /* Call to Action for Guests */
                     <div className="text-center mb-16">
                        <Button to="/register" variant="primary" className="text-lg px-8 py-4 shadow-xl">
                            Join for Free & Grab 200 Points
                        </Button>
                        <p className="mt-4 text-sm text-gray-500">Already a member? <a href="/login" className="text-brand-primary underline">Log in</a> to check your balance.</p>
                    </div>
                )}

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-4">How It Works</h2>
                        <p className="text-gray-700 leading-relaxed">
                            It's simple: Shop your favorites, earn points on every purchase, and treat yourself to exclusive rewards.
                        </p>
                    </motion.div>

                    {/* Tiers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center mb-12">
                        <motion.div 
                            className="bg-white p-6 rounded-lg shadow-md"
                             initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="text-xl font-semibold text-brand-primary mb-2">1. Earn Points</h3>
                            <p className="text-gray-600">Get 1 point for every ₦100 you spend. Plus, earn 200 points just for signing up!</p>
                        </motion.div>
                         <motion.div 
                            className="bg-white p-6 rounded-lg shadow-md"
                             initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-xl font-semibold text-brand-primary mb-2">2. Unlock Tiers</h3>
                            <p className="text-gray-600">
                                <strong>Seedling:</strong> 0-999 pts<br/>
                                <strong>Blossom:</strong> 1000-4999 pts<br/>
                                <strong>Radiant:</strong> 5000+ pts
                            </p>
                        </motion.div>
                         <motion.div 
                            className="bg-white p-6 rounded-lg shadow-md md:col-span-2 lg:col-span-1"
                             initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-xl font-semibold text-brand-primary mb-2">3. Redeem Rewards</h3>
                            <p className="text-gray-600">Use your points for discounts on future orders. No minimum spend required to redeem.</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoyaltyPage;
