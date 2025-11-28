
import React from 'react';
// FIX: Import `Variants` type from `framer-motion` to resolve type error.
import { motion, type Variants } from 'framer-motion';
import { TESTIMONIALS } from '../../constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// FIX: Add `Variants` type to ensure compatibility with framer-motion.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' },
  },
};

const TestimonialsPage: React.FC = () => {
  return (
    <div className="bg-brand-light min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl font-serif font-bold text-brand-dark"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Words of Wellness
          </motion.h1>
          <motion.p
            className="text-gray-600 mt-2 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hear from members of our community who have experienced the Optimistics Naturals difference.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mb-4 border-4 border-brand-secondary"
              />
              <p className="text-gray-600 italic leading-relaxed flex-grow">
                "{testimonial.quote}"
              </p>
              <div className="mt-4">
                <p className="font-bold text-brand-primary text-lg">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
