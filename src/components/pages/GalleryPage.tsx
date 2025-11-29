
import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import Button from '../ui/Button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 100 }
  }
};

const GalleryPage: React.FC = () => {
    const { galleryImages } = useData();

    return (
        <div className="bg-brand-light min-h-screen pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <motion.h1 
                        className="text-4xl font-serif font-bold text-brand-dark"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Real Results
                    </motion.h1>
                    <motion.p 
                        className="text-gray-600 mt-2 max-w-xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        See the transformative power of our natural oils. Photos from real customers, real journeys.
                    </motion.p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {galleryImages.length > 0 ? (
                        galleryImages.map((image) => (
                            <motion.div 
                                key={image.id} 
                                className="bg-white rounded-lg shadow-lg overflow-hidden"
                                variants={itemVariants}
                            >
                                <div className="grid grid-cols-2">
                                    <div className="relative">
                                        <img src={image.beforeUrl} alt="Before" className="w-full h-full object-cover aspect-[4/3]"/>
                                        <span className="absolute top-2 left-2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded">BEFORE</span>
                                    </div>
                                    <div className="relative">
                                        <img src={image.afterUrl} alt="After" className="w-full h-full object-cover aspect-[4/3]"/>
                                        <span className="absolute top-2 left-2 bg-brand-primary text-white text-xs font-semibold px-2 py-1 rounded">AFTER</span>
                                    </div>
                                </div>
                                <div className="p-4 text-center bg-brand-secondary">
                                    <p className="font-semibold text-brand-dark">{image.description}</p>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            <p>No results available to display at the moment.</p>
                        </div>
                    )}
                </motion.div>

                {/* Call to Action */}
                <motion.div 
                    className="text-center bg-brand-secondary/30 p-10 rounded-xl max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-serif font-bold text-brand-dark mb-4">Show off your glow!</h2>
                    <p className="text-gray-600 mb-6">Have before and after photos? Submit them to be featured in our gallery and help others see what's possible.</p>
                    <Button to="/share-story">Submit Your Results</Button>
                </motion.div>
            </div>
        </div>
    );
};

export default GalleryPage;
