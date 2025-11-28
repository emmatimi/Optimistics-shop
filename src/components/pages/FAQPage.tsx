
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
    question: string;
    answer: string;
}

const faqs: FAQItemProps[] = [
    {
        question: "Are your products 100% natural?",
        answer: "Yes, absolutely. All our products are made from 100% pure, cold-pressed plant extracts. We do not use any synthetic fragrances, parabens, or additives."
    },
    {
        question: "How long does shipping take?",
        answer: "We offer FREE standard shipping on all orders over ₦50,000. For orders under that, a flat rate of ₦5,000 applies. Standard shipping within Nigeria typically takes 3-5 business days."
    },
    {
        question: "What is your return policy?",
        answer: "You can return an item within 30 days of receiving it, as long as it's at least half-full and in its original packaging. Please contact our support team to initiate a return."
    },
    {
        question: "Are your products tested on animals?",
        answer: "Never. We are a cruelty-free brand and are firmly against animal testing. All our products are vegan."
    },
    {
        question: "How should I store my oils?",
        answer: "To preserve the potency and freshness of your oils, we recommend storing them in a cool, dark place away from direct sunlight."
    }
];

const AccordionItem: React.FC<{ faq: FAQItemProps }> = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-5 text-left text-lg font-semibold text-brand-dark"
            >
                <span>{faq.question}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 text-gray-700 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQPage: React.FC = () => {
    return (
        <div className="bg-brand-light min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                 <div className="text-center mb-12">
                    <motion.h1 
                        className="text-4xl font-serif font-bold text-brand-dark"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Frequently Asked Questions
                    </motion.h1>
                    <motion.p 
                        className="text-gray-600 mt-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Have questions? We've got answers.
                    </motion.p>
                </div>
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} faq={faq} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
