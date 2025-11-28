import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../types';
import Button from './ui/Button';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import StarRating from './ui/StarRating';

interface ProductCardProps {
  product: Product;
}

const WishlistButton: React.FC<{ productId: string }> = ({ productId }) => {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const inWishlist = isInWishlist(productId);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };

    return (
        <motion.button
            onClick={handleClick}
            className="absolute top-2 right-2 bg-white/80 rounded-full p-2 text-brand-dark hover:text-red-500 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={inWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
        </motion.button>
    );
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden group flex flex-col"
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      layout
    >
        <div className="relative">
             <WishlistButton productId={product.id} />
            <Link to={`/product/${product.id}`} className="block">
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-56 object-cover" 
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="224"
                />
                {product.isBestseller && (
                    <span className="absolute top-2 left-2 bg-brand-accent text-white text-xs font-semibold px-2 py-1 rounded">Bestseller</span>
                )}
            </Link>
        </div>
        <Link to={`/product/${product.id}`} className="block flex-grow flex flex-col">
            <div className="p-4 flex-grow">
              <h3 className="font-serif text-lg font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{product.name}</h3>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <p>{product.categories.join(' / ')}</p>
                <p className="font-medium text-brand-dark">{product.size}</p>
              </div>
              <div className="flex items-center my-2">
                <StarRating rating={averageRating} />
                <span className="text-xs text-gray-500 ml-2">({product.reviews.length} reviews)</span>
              </div>
            </div>
        </Link>
      <div className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xl font-semibold text-brand-primary">{product.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>
        <Button onClick={() => addToCart(product)} variant="primary" className="text-xs px-4 py-2">
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;