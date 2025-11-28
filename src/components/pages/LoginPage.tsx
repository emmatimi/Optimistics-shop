
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface LocationState {
    from: {
        pathname: string;
    };
}

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
        />
    </svg>
);

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isResetOpen, setIsResetOpen] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    
    const { login, loginWithGoogle, resetPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Type checking for location state
    const state = location.state as LocationState;
    const from = state?.from?.pathname || "/";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = await login(email, password);
        if (success) {
            navigate(from, { replace: true });
        } else {
            setError('Invalid email or password.');
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        const success = await loginWithGoogle();
        if (success) {
            navigate(from, { replace: true });
        } else {
            setError('Google sign-in failed. Please try again.');
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetMessage('');
        if (!resetEmail) {
            setResetMessage('Please enter your email address.');
            return;
        }
        const success = await resetPassword(resetEmail);
        if (success) {
            setResetMessage('Password reset link sent! Check your inbox.');
            setTimeout(() => setIsResetOpen(false), 3000);
        } else {
            setResetMessage('Failed to send reset link. Check the email provided.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-light py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg relative z-10">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-serif font-bold text-brand-dark">
                        Sign in to your account
                    </h2>
                </div>
                
                {/* Email/Password Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-end">
                        <button 
                            type="button"
                            onClick={() => setIsResetOpen(true)}
                            className="text-sm font-medium text-brand-primary hover:text-brand-accent focus:outline-none"
                        >
                            Forgot your password?
                        </button>
                    </div>

                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    <div>
                        <Button type="submit" className="w-full">
                            Sign in
                        </Button>
                    </div>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                {/* Social Login */}
                <div>
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
                    >
                        <GoogleIcon />
                        Sign in with Google
                    </button>
                </div>

                <div className="flex items-center justify-center mt-6">
                    <div className="text-sm">
                        <Link to="/register" className="font-medium text-brand-primary hover:text-brand-accent">
                            Don't have an account? Register
                        </Link>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            <AnimatePresence>
                {isResetOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6"
                        >
                            <h3 className="text-xl font-bold text-brand-dark mb-2">Reset Password</h3>
                            <p className="text-sm text-gray-600 mb-4">Enter your email address and we'll send you a link to reset your password.</p>
                            
                            <form onSubmit={handlePasswordReset}>
                                <input
                                    type="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm mb-4"
                                    placeholder="Enter your email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                />
                                {resetMessage && (
                                    <p className={`text-sm mb-4 ${resetMessage.includes('sent') ? 'text-green-600' : 'text-red-600'}`}>
                                        {resetMessage}
                                    </p>
                                )}
                                <div className="flex justify-end space-x-3">
                                    <button 
                                        type="button"
                                        onClick={() => setIsResetOpen(false)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-brand-primary hover:bg-opacity-90 rounded-md focus:outline-none"
                                    >
                                        Send Link
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LoginPage;
