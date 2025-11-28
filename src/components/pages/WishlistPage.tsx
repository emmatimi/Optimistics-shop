
import React from 'react';
import { motion } from 'framer-motion';
import { useWishlist } from '../../contexts/WishlistContext';
import { useData } from '../../contexts/DataContext';
import ProductCard from '../ProductCard';
import Button from '../ui/Button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const WishlistPage: React.FC = () => {
  const { wishlistItems } = useWishlist();
  const { products } = useData();
  const wishedProducts = products.filter(product => wishlistItems.includes(product.id));

  return (
    <div className="bg-brand-light min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-serif font-bold text-brand-dark"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your Wishlist
          </motion.h1>
          <motion.p 
            className="text-gray-600 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your curated collection of future favorites.
          </motion.p>
        </div>

        {wishedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600 mb-4">Your wishlist is empty.</p>
            <p className="text-gray-500 mb-6">Tap the heart icon on products to save them for later.</p>
            <Button to="/shop" variant="primary">Discover Products</Button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {wishedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
