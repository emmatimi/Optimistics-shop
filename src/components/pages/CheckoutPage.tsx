
import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useNotification } from '../../contexts/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';

// Declare MonnifySDK on window to satisfy TypeScript
declare global {
    interface Window {
        MonnifySDK: any;
    }
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    fullWidth?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, fullWidth = false, ...props }) => (
    <div className={fullWidth ? 'col-span-2' : ''}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            id={id}
            name={id}
            {...props}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary disabled:bg-gray-100"
        />
    </div>
);

const CheckoutPage: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const { addOrder } = useData();
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('Nigeria');

    // Loyalty State
    const [useLoyalty, setUseLoyalty] = useState(false);
    const [pointsToRedeem, setPointsToRedeem] = useState(0);

    const availablePoints = user?.loyaltyPoints || 0;
    const maxRedeemable = Math.min(availablePoints, cartTotal);
    const discountAmount = useLoyalty ? pointsToRedeem : 0;
    const finalTotal = Math.max(0, cartTotal - discountAmount); // Ensure never negative

    // Generate Order ID early for reference
    const [currentOrderId] = useState(`ORD-${Math.floor(Math.random() * 1000000)}`);

    useEffect(() => {
        if(user) {
            setEmail(user.email);
            setFirstName(user.name.split(' ')[0] || '');
            setLastName(user.name.split(' ')[1] || '');
        }
    }, [user]);

    // Load Monnify Script Dynamically
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://sdk.monnify.com/plugin/monnify.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const handleSuccessPayment = (response: any) => {
        console.log("Monnify Success:", response);
        
        const newOrder = {
            id: currentOrderId,
            userId: user?.id,
            customerName: `${firstName} ${lastName}`,
            customerEmail: email,
            date: new Date().toISOString(),
            total: finalTotal,
            status: 'Processing' as const,
            items: cartItems,
            shippingAddress: `${address}, ${city}, ${state}`,
            pointsRedeemed: discountAmount,
            discountApplied: discountAmount
        };

        addOrder(newOrder);
        clearCart();
        navigate('/order-success', { state: { orderId: currentOrderId } });
    };

    const handleClosePayment = () => {
        showNotification('Payment cancelled. You can try again.', 'info');
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic Validation
        if (!email || !firstName || !lastName || !address || !city) {
            showNotification('Please fill in all required shipping fields.', 'error');
            return;
        }

        if (finalTotal <= 0) {
            showNotification('Order total must be greater than 0.', 'error');
            return;
        }

        const apiKey = (import.meta as any).env.VITE_MONNIFY_API_KEY;
        const contractCode = (import.meta as any).env.VITE_MONNIFY_CONTRACT_CODE;

        // DEBUGGING LOGS (Check console F12 if payment fails)
        console.log("Initializing Monnify with:", {
            apiKey: apiKey ? "Present" : "Missing",
            contractCode: contractCode ? "Present" : "Missing",
            amount: finalTotal,
            email
        });

        if (!apiKey || !contractCode) {
            showNotification('Payment gateway configuration missing. Check .env file.', 'error');
            return;
        }

        if (window.MonnifySDK) {
            window.MonnifySDK.initialize({
                amount: finalTotal,
                currency: "NGN",
                reference: `${currentOrderId}-${Date.now()}`,
                customerName: `${firstName} ${lastName}`,
                customerEmail: email,
                apiKey: apiKey,
                contractCode: contractCode,
                paymentDescription: `Order ${currentOrderId}`,
                isTestMode: true, // TODO: Set to false if using Live Keys
                metadata: {
                    "name": `${firstName} ${lastName}`,
                },
                onComplete: handleSuccessPayment,
                onClose: handleClosePayment
            });
        } else {
            showNotification('Payment gateway failed to load. Please refresh and try again.', 'error');
        }
    };

    if (cartItems.length === 0) {
        return (
             <div className="text-center py-20">
                <h2 className="text-xl">Your cart is empty.</h2>
                <Button to="/shop" className="mt-4">Go to Shop</Button>
            </div>
        );
    }
    
    return (
        <div className="bg-brand-light min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-serif font-bold text-brand-dark mb-8 text-center">Checkout</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Shipping Forms */}
                        <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <InputField 
                                    label="First Name" 
                                    id="firstName" 
                                    type="text" 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required 
                                />
                                <InputField 
                                    label="Last Name" 
                                    id="lastName" 
                                    type="text" 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required 
                                />
                                <InputField 
                                    label="Email Address" 
                                    id="email" 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={!!user}
                                    required 
                                    fullWidth 
                                />
                                <InputField 
                                    label="Address" 
                                    id="address" 
                                    type="text" 
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required fullWidth 
                                />
                                <InputField 
                                    label="City" 
                                    id="city" 
                                    type="text" 
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required 
                                />
                                <InputField 
                                    label="State / Province" 
                                    id="state" 
                                    type="text" 
                                    value={state} 
                                    onChange={(e) => setState(e.target.value)}
                                    required 
                                />
                                <InputField 
                                    label="Zip / Postal Code" 
                                    id="zip" 
                                    type="text" 
                                    value={zip} 
                                    onChange={(e) => setZip(e.target.value)}
                                    required 
                                />
                                <InputField 
                                    label="Country" 
                                    id="country" 
                                    type="text" 
                                    value={country} 
                                    onChange={(e) => setCountry(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
                                <h3 className="font-semibold text-blue-800 mb-2">Payment Method</h3>
                                <p className="text-sm text-blue-600">
                                    You will be redirected to the secure <strong>Monnify</strong> gateway to complete your payment via Card or Bank Transfer.
                                </p>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="md:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                                <h2 className="text-xl font-semibold mb-4 border-b pb-4">Your Order</h2>
                                <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex justify-between items-center text-sm">
                                            <div className="flex items-center">
                                                <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-3" />
                                                <div>
                                                    <p className="font-semibold">{item.name}</p>
                                                    <p className="text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p>{(item.price * item.quantity).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2 border-t pt-4">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>{cartTotal.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="text-green-600">FREE</span>
                                    </div>

                                    {/* Loyalty Points Section */}
                                    {availablePoints > 0 && (
                                        <div className="bg-brand-secondary/20 p-3 rounded-md mt-4 border border-brand-primary/20">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-semibold text-brand-primary text-sm">Loyalty Rewards</h3>
                                                <span className="text-xs bg-brand-primary text-white px-2 py-0.5 rounded-full">{availablePoints} pts available</span>
                                            </div>
                                            
                                            <div className="flex items-center space-x-2">
                                                <input 
                                                    type="checkbox" 
                                                    id="usePoints" 
                                                    checked={useLoyalty}
                                                    onChange={(e) => {
                                                        setUseLoyalty(e.target.checked);
                                                        if(e.target.checked) setPointsToRedeem(maxRedeemable);
                                                    }}
                                                    className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                                                />
                                                <label htmlFor="usePoints" className="text-sm text-gray-700">Redeem Points</label>
                                            </div>

                                            <AnimatePresence>
                                                {useLoyalty && (
                                                    <motion.div 
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-2 text-sm">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <label className="text-gray-600">Points to use:</label>
                                                                <span className="font-medium text-brand-dark">- ₦{pointsToRedeem.toLocaleString()}</span>
                                                            </div>
                                                            <input 
                                                                type="range" 
                                                                min="0" 
                                                                max={maxRedeemable} 
                                                                value={pointsToRedeem} 
                                                                onChange={(e) => setPointsToRedeem(parseInt(e.target.value))}
                                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                                                            />
                                                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                                <span>0</span>
                                                                <span>{maxRedeemable}</span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    )}

                                    <div className="flex justify-between font-bold text-lg border-t pt-4 mt-2">
                                        <span>Total</span>
                                        <span>{finalTotal.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span>
                                    </div>
                                </div>
                                <Button type="submit" variant="primary" className="w-full mt-6">
                                    Pay {finalTotal.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                                </Button>
                                <div className="mt-4 flex justify-center">
                                    <img src="https://monnify.com/images/logo.svg" alt="Secured by Monnify" className="h-6 opacity-60" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
