
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const ContactPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you shortly.');
        // In a real app, you would handle form submission here
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
                            For any inquiries, please reach out to us through the following channels. Our team is available from 9 AM to 5 PM, Monday to Friday.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <span className="text-brand-primary mr-3">&#9993;</span>
                                <a href="mailto:support@optimistics.com" className="text-gray-700 hover:text-brand-primary">support@optimistics.com</a>
                            </div>
                            <div className="flex items-center">
                                <span className="text-brand-primary mr-3">&#9742;</span>
                                <a href="tel:+234123456789" className="text-gray-700 hover:text-brand-primary">+234 123 456 789</a>
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
                                <input type="text" id="name" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" id="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary" />
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea id="message" rows={4} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-brand-primary focus:border-brand-primary"></textarea>
                            </div>
                            <div>
                                <Button type="submit" className="w-full">Send Message</Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
