
import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import Button from '../ui/Button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const },
  },
};

const TestimonialsPage: React.FC = () => {
  const { testimonials } = useData();

  return (
    <div className="bg-brand-light min-h-screen pb-16">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mb-4 border-4 border-brand-secondary object-cover"
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

        {/* Call to Action */}
        <motion.div 
            className="text-center bg-brand-secondary/30 p-10 rounded-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h2 className="text-2xl font-serif font-bold text-brand-dark mb-4">Have a story to tell?</h2>
            <p className="text-gray-600 mb-6">We'd love to hear about your journey with Optimistics Naturals. Share your experience and inspire others!</p>
            <Button to="/share-story">Share Your Story</Button>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
