
import React from 'react';
// FIX: Import `Variants` type from `framer-motion` to resolve type error.
import { motion, type Variants } from 'framer-motion';
import { GALLERY_IMAGES } from '../../constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// FIX: Add `Variants` type to ensure compatibility with framer-motion.
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const GalleryPage: React.FC = () => {
    return (
        <div className="bg-brand-light min-h-screen">
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
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {GALLERY_IMAGES.map((image) => (
                        <motion.div 
                            key={image.id} 
                            className="bg-white rounded-lg shadow-lg overflow-hidden"
                            variants={itemVariants}
                        >
                            <div className="grid grid-cols-2">
                                <div className="relative">
                                    <img src={image.beforeUrl} alt="Before" className="w-full h-full object-cover"/>
                                    <span className="absolute top-2 left-2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded">BEFORE</span>
                                </div>
                                 <div className="relative">
                                    <img src={image.afterUrl} alt="After" className="w-full h-full object-cover"/>
                                    <span className="absolute top-2 left-2 bg-brand-primary text-white text-xs font-semibold px-2 py-1 rounded">AFTER</span>
                                </div>
                            </div>
                            <div className="p-4 text-center bg-brand-secondary">
                                <p className="font-semibold text-brand-dark">{image.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default GalleryPage;
