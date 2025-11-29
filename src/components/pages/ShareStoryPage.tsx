import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import { useNotification } from '../../contexts/NotificationContext';
import Button from '../ui/Button';
import ImageUpload from '../ui/ImageUpload';

const ShareStoryPage: React.FC = () => {
    const { submitUserStory } = useData();
    const { showNotification } = useNotification();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState<'testimonial' | 'result'>('testimonial');
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await submitUserStory({
                type,
                customerName: name,
                email,
                content,
                location,
                imageUrl, // This now contains the Base64 compressed string
                date: new Date().toISOString(),
                status: 'pending'
            });
            showNotification('Thank you! Your story has been submitted for review.', 'success');
            // Reset form
            setName('');
            setEmail('');
            setContent('');
            setLocation('');
            setImageUrl('');
        } catch (error) {
            console.error("Submission error:", error);
            showNotification('Failed to submit story. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-brand-light min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
                <div className="text-center mb-10">
                    <motion.h1 
                        className="text-4xl font-serif font-bold text-brand-dark"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Share Your Story
                    </motion.h1>
                    <p className="text-gray-600 mt-2">
                        Inspire others with your natural beauty journey.
                    </p>
                </div>

                <motion.div 
                    className="bg-white p-8 rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">What are you sharing?</label>
                            <div className="flex space-x-4">
                                <button 
                                    type="button"
                                    onClick={() => setType('testimonial')}
                                    className={`flex-1 py-2 px-4 rounded-md border text-center transition-colors ${type === 'testimonial' ? 'bg-brand-primary text-white border-brand-primary' : 'bg-gray-50 text-gray-600'}`}
                                >
                                    Review / Testimonial
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setType('result')}
                                    className={`flex-1 py-2 px-4 rounded-md border text-center transition-colors ${type === 'result' ? 'bg-brand-primary text-white border-brand-primary' : 'bg-gray-50 text-gray-600'}`}
                                >
                                    Results (Before/After)
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Your Name</label>
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email (Private)</label>
                                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location (City, Country)</label>
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 block w-full border rounded-md p-2" placeholder="e.g. Lagos, Nigeria" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Your Story / Review</label>
                            <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={4} className="mt-1 block w-full border rounded-md p-2" placeholder="Tell us about your experience..." />
                        </div>

                        <div>
                             <ImageUpload 
                                label="Upload Photo (Optional)" 
                                value={imageUrl} 
                                onChange={setImageUrl}
                                // Folder is ignored by Base64 uploader but kept for interface consistency
                                folder="submissions" 
                            />
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? "Submitting..." : "Submit Story"}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ShareStoryPage;