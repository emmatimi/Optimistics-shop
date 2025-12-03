import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useNotification } from '../../contexts/NotificationContext';
import { sendOrderConfirmationEmail, sendPaymentReceivedEmail } from '../../utils/emailService';

// NIGERIAN STATES LIST
const NIGERIAN_STATES = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
    "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
    "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
    "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "Abuja"
];

declare global {
    interface Window {
        MonnifySDK: any;
    }
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
    label: string;
    id: string;
    fullWidth?: boolean;
    as?: 'select';
    children?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, fullWidth = false, as, children, ...props }) => (
    <div className={fullWidth ? 'col-span-2' : ''}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        {as === 'select' ? (
            <select
                id={id}
                name={id}
                {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary disabled:bg-gray-100"
            >
                {children}
            </select>
        ) : (
            <input
                id={id}
                name={id}
                {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary disabled:bg-gray-100"
            />
        )}
    </div>
);

const CheckoutPage: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const { addOrder, shippingConfig } = useData(); 
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('Nigeria');

    const [shippingFee, setShippingFee] = useState(0);

    const [useLoyalty, setUseLoyalty] = useState(false);
    const [pointsToRedeem, setPointsToRedeem] = useState(0);

    const availablePoints = user?.loyaltyPoints || 0;
    const maxRedeemable = Math.min(availablePoints, cartTotal);
    const discountAmount = useLoyalty ? pointsToRedeem : 0;
    
    useEffect(() => {
        if (!shippingConfig) {
            setShippingFee(5000); 
            return;
        }

        if (cartTotal >= shippingConfig.freeShippingThreshold) {
            setShippingFee(0);
            return;
        }

        if (state) {
            const stateRate = shippingConfig.rates.find(r => r.state === state);
            if (stateRate) {
                setShippingFee(stateRate.fee);
            } else {
                setShippingFee(shippingConfig.defaultFee);
            }
        } else {
            setShippingFee(0);
        }
    }, [state, cartTotal, shippingConfig]);

    const finalTotal = Math.max(0, cartTotal + shippingFee - discountAmount);

    const [currentOrderId] = useState(`ORD-${Math.floor(Math.random() * 1000000)}`);

    useEffect(() => {
        if(user) {
            setEmail(user.email);
            setFirstName(user.name.split(' ')[0] || '');
            setLastName(user.name.split(' ')[1] || '');
        }
    }, [user]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://sdk.monnify.com/plugin/monnify.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        }
    }, []);

    const handleSuccessPayment = async (response: any) => {
        console.log("Monnify Success:", response);
        
        const newOrder = {
            id: currentOrderId,
            userId: user?.id,
            customerName: `${firstName} ${lastName}`,
            customerEmail: email,
            customerPhone: phone,
            date: new Date().toISOString(),
            total: finalTotal,
            shippingFee: shippingFee,
            status: 'Processing' as const,
            items: cartItems,
            shippingAddress: `${address}, ${city}, ${state}`,
            pointsRedeemed: discountAmount,
            discountApplied: discountAmount
        };

        try {
            await addOrder(newOrder);
            await sendOrderConfirmationEmail(newOrder);
            
            const txRef = response.transactionReference || response.paymentReference || "N/A";
            await sendPaymentReceivedEmail(newOrder, txRef);
            
            clearCart();
            navigate('/order-success', { state: { orderId: currentOrderId } });
        } catch (error) {
            console.error("Order processing error", error);
            showNotification('Payment successful, but order creation failed. Contact support.', 'error');
        }
    };

    const handleClosePayment = () => {
        showNotification('Payment cancelled. You can try again.', 'info');
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !firstName || !lastName || !address || !city || !state || !phone) {
            showNotification('Please fill in all required shipping fields.', 'error');
            return;
        }

        const apiKey = (import.meta as any).env.VITE_MONNIFY_API_KEY;
        const contractCode = (import.meta as any).env.VITE_MONNIFY_CONTRACT_CODE;

        if (!apiKey || !contractCode) {
            showNotification('Payment gateway config missing.', 'error');
            return;
        }

        const isTestMode = apiKey.startsWith("MK_TEST");

        if ((window as any).MonnifySDK) {
            (window as any).MonnifySDK.initialize({
                amount: finalTotal,
                currency: "NGN",
                reference: `${currentOrderId}-${Date.now()}`,
                customerName: `${firstName} ${lastName}`,
                customerEmail: email,
                customerMobileNumber: phone,
                apiKey: apiKey,
                contractCode: contractCode,
                paymentDescription: `Order ${currentOrderId}`,
                isTestMode: isTestMode, 
                metadata: {
                    "name": `${firstName} ${lastName}`,
                    "phone": phone
                },
                onComplete: (response: any) => { handleSuccessPayment(response); },
                onClose: () => { handleClosePayment(); } 
            });
        } else {
            showNotification('Payment gateway failed to load.', 'error');
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
                        <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <InputField label="First Name" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                <InputField label="Last Name" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                <InputField label="Email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!!user} required fullWidth />
                                <InputField label="Phone" id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required fullWidth placeholder="080..." />
                                <InputField label="Address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required fullWidth />
                                <InputField label="City" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                                
                                <InputField 
                                    label="State" 
                                    id="state" 
                                    as="select" 
                                    value={state} 
                                    onChange={(e) => setState(e.target.value)} 
                                    required
                                >
                                    <option value="">Select State</option>
                                    {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                </InputField>

                                <InputField label="Zip Code" id="zip" value={zip} onChange={(e) => setZip(e.target.value)} required />
                                <InputField label="Country" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                                <h2 className="text-xl font-semibold mb-4 border-b pb-4">Order Summary</h2>
                                <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span>{item.name} (x{item.quantity})</span>
                                            <span>{(item.price * item.quantity).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span>
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
                                        <span className={shippingFee === 0 ? "text-green-600 font-bold" : ""}>
                                            {shippingFee === 0 ? "FREE" : `₦${shippingFee.toLocaleString()}`}
                                        </span>
                                    </div>

                                    {availablePoints > 0 && (
                                        <div className="bg-brand-secondary/20 p-3 rounded-md mt-4 border border-brand-primary/20">
                                            <div className="flex items-center space-x-2">
                                                <input 
                                                    type="checkbox" 
                                                    id="usePoints" 
                                                    checked={useLoyalty}
                                                    onChange={(e) => {
                                                        setUseLoyalty(e.target.checked);
                                                        if(e.target.checked) setPointsToRedeem(maxRedeemable);
                                                    }}
                                                    className="h-4 w-4 rounded"
                                                />
                                                <label htmlFor="usePoints" className="text-sm">Redeem Points</label>
                                            </div>
                                            {useLoyalty && (
                                                <div className="mt-2">
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span>Discount:</span>
                                                        <span className="font-bold">-₦{pointsToRedeem.toLocaleString()}</span>
                                                    </div>
                                                    <input 
                                                        type="range" 
                                                        min="0" 
                                                        max={maxRedeemable} 
                                                        value={pointsToRedeem} 
                                                        onChange={(e) => setPointsToRedeem(parseInt(e.target.value))}
                                                        className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
                                                    />
                                                </div>
                                            )}
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
                                <div className="mt-4 flex justify-center"><img src="https://monnify.com/images/logo.svg" alt="Monnify" className="h-6 opacity-60" /></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;