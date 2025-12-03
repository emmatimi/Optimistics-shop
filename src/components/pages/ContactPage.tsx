import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { sendContactFormEmail } from '../../utils/emailService';
import { useNotification } from '../../contexts/NotificationContext';

const ContactPage: React.FC = () => {
    const { showNotification } = useNotification();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all fields.', 'error');
            setLoading(false);
            return;
        }

        try {
            await sendContactFormEmail(formData.name, formData.email, formData.message);
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            // Clear form
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error("Contact submission error:", error);
            showNotification('Failed to send message. Please check your connection.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-brand-light min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <motion.h1 
                        className="text-4xl font-serif font-bold text-brand-dark"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p 
                        className="text-gray-600 mt-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        We'd love to hear from you. Questions, comments, or just want to say hello?
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl font-semibold text-brand-dark mb-4">Contact Information</h2>
                        <p className="text-gray-700 mb-6">
                            For any inquiries, please reach out to us through the following channels. Our team is available from 7 AM to 10 PM, All days.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <span className="text-brand-primary mr-3">&#9993;</span>
                                <a href="mailto:support@optimistics.com" className="text-gray-700 hover:text-brand-primary">support@optimistics.com</a>
                            </div>
                            <div className="flex items-center">
                                <span className="text-brand-primary mr-3">&#9742;</span>
                                <a href="tel:+234123456789" className="text-gray-700 hover:text-brand-primary">+2349065388881</a>
                            </div>
                            <div className="flex items-start">
                                <span className="text-brand-primary mr-3 mt-1">&#127968;</span>
                                <p className="text-gray-700">Ikotun, Lagos, Nigeria</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="bg-white p-8 rounded-lg shadow-md"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary" 
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary" 
                                    placeholder="Enter your email"
                                />
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea 
                                    id="message" 
                                    rows={4} 
                                    value={formData.message}
                                    onChange={handleChange}
                                    required 
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>
                            <div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Message'}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;