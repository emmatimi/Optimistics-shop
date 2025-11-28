import React from 'react';
import { motion } from 'framer-motion';

const PolicySection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-2xl font-serif font-bold text-brand-dark mb-4">{title}</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
            {children}
        </div>
    </motion.div>
);

const PolicyPage: React.FC = () => {
    return (
        <div className="bg-brand-light min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-brand-dark">Policies</h1>
                    <p className="text-gray-600 mt-2">Everything you need to know about shipping and returns.</p>
                </div>
                
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <PolicySection title="Shipping Policy">
                        <p>We are excited to get our natural products into your hands! We currently ship to addresses within Nigeria.</p>
                        <p><strong>Processing Time:</strong> All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
                        <p><strong>Shipping Rates & Delivery Estimates:</strong> We offer FREE standard shipping on all orders over ₦50,000. For orders under ₦50,000, a flat rate of ₦5,000 applies. Standard shipping typically takes 3-5 business days.</p>
                        <p>You will receive a shipment confirmation email once your order has shipped, containing your tracking number(s).</p>
                    </PolicySection>

                    <PolicySection title="Return Policy">
                        <p>Your satisfaction is our top priority. If you are not completely happy with your purchase, we're here to help.</p>
                        <p><strong>Returns:</strong> You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be at least half-full and in its original packaging.</p>
                        <p><strong>Refunds:</strong> Once we receive your item, we will inspect it and notify you that we have received your returned item. If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.</p>
                        <p><strong>Contact Us:</strong> To initiate a return, please contact our support team at <a href="mailto:support@optimistics.com" className="text-brand-primary underline">support@optimistics.com</a> with your order number and reason for return.</p>
                    </PolicySection>
                </div>
            </div>
        </div>
    );
};

export default PolicyPage;