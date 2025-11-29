
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import Button from '../ui/Button';
import StarRating from '../ui/StarRating';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useNotification } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';

type Tab = 'description' | 'ingredients' | 'usage';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { products, addProductReview } = useData();
    const product = products.find(p => p.id === id);

    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<Tab>('description');
    const [mainImage, setMainImage] = useState(product?.imageUrl);
    const [selectedSize, setSelectedSize] = useState(product?.size || '');
    
    // Review Form State
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviewerName, setReviewerName] = useState('');
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    const { addToCart } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const { showNotification } = useNotification();
    const { user } = useAuth();
    
    useEffect(() => {
        if (product) {
            setMainImage(product.imageUrl);
            setSelectedSize(product.size);
        }
        window.scrollTo(0, 0);
    }, [product]);

    if (!product) {
        return <div className="text-center py-20">Product not found.</div>;
    }

    const inWishlist = isInWishlist(product.id);
    
    const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

    const currentPrice = (product.sizes && product.sizes[selectedSize]) 
        ? product.sizes[selectedSize] 
        : product.price;

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedSize);
    };

     const handleWishlistToggle = () => {
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingReview(true);
        try {
            const newReview = {
                id: Date.now(),
                author: reviewerName || user?.name || 'Anonymous',
                rating: rating,
                comment: comment,
                date: new Date().toLocaleDateString()
            };
            await addProductReview(product.id, newReview);
            showNotification('Review submitted successfully!', 'success');
            setComment('');
            setReviewerName('');
            setRating(5);
        } catch (error) {
            showNotification('Failed to submit review. Try again.', 'error');
        } finally {
            setIsSubmittingReview(false);
        }
    }

    const TabButton: React.FC<{tabName: Tab, label: string}> = ({tabName, label}) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 font-semibold text-sm rounded-t-lg transition-colors ${
                activeTab === tabName 
                ? 'bg-white border-b-2 border-brand-primary text-brand-primary' 
                : 'text-gray-500 hover:text-brand-dark'
            }`}
        >
            {label}
        </button>
    )

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:items-start">
                
                {/* Image Gallery */}
                <motion.div 
                    className="md:col-span-2 order-1"
                    initial={{ opacity: 0, x: -50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative mb-4 bg-white rounded-lg shadow-lg overflow-hidden aspect-square">
                        <AnimatePresence>
                            <motion.img 
                                key={mainImage}
                                src={mainImage} 
                                alt={product.name} 
                                className="w-full h-full object-cover" 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </AnimatePresence>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {product.images.map((img, idx) => (
                             <img 
                                key={idx} 
                                src={img} 
                                alt={`${product.name} thumbnail ${idx + 1}`} 
                                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${mainImage === img ? 'border-brand-primary' : 'border-transparent'}`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Product Info */}
                <div className="md:col-span-3 md:sticky md:top-24 order-2">
                    <motion.div 
                        className="flex flex-col space-y-5"
                        initial={{ opacity: 0, x: 50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div>
                            <h1 className="text-4xl font-serif font-bold text-brand-dark mb-2">{product.name}</h1>
                            <p className="text-gray-500">{product.categories.join(' & ')}</p>
                        </div>
                        <div className="flex items-center">
                            <StarRating rating={averageRating} />
                            <a href="#reviews" className="text-sm text-gray-600 ml-2 hover:underline">({product.reviews.length} reviews)</a>
                        </div>
                        <p className="text-3xl font-semibold text-brand-primary">{currentPrice.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>
                        
                        {product.sizes && (
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Size: <span className="font-normal">{selectedSize}</span></h3>
                                <div className="flex flex-wrap gap-2">
                                    {Object.keys(product.sizes).map(size => (
                                        <button 
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                                                selectedSize === size
                                                ? 'bg-brand-primary text-white border-brand-primary' 
                                                : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border rounded-md">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-100">-</button>
                                <span className="px-4 py-2 font-semibold">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                            <Button onClick={handleAddToCart} className="flex-1">Add to Cart</Button>
                            <motion.button
                                onClick={handleWishlistToggle}
                                className="p-3 border rounded-md text-brand-dark hover:text-red-500"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={inWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                                </svg>
                            </motion.button>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex border-b -mb-px">
                                <TabButton tabName="description" label="Benefits" />
                                <TabButton tabName="ingredients" label="Ingredients" />
                                <TabButton tabName="usage" label="How to Use" />
                            </div>
                            <div className="py-6 bg-white p-4 rounded-b-lg">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -10, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {activeTab === 'description' && (
                                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                                {product.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                                            </ul>
                                        )}
                                        {activeTab === 'ingredients' && (
                                            <p className="text-gray-700">{product.ingredients.join(', ')}.</p>
                                        )}
                                        {activeTab === 'usage' && (
                                            <p className="text-gray-700 whitespace-pre-line">{product.usage}</p>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
                
                {/* Reviews Section */}
                <div id="reviews" className="md:col-span-5 order-3">
                     <div className="grid md:grid-cols-2 gap-12">
                        {/* List Reviews */}
                        <div>
                             <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6">Customer Reviews</h2>
                             <div className="space-y-6">
                                {product.reviews.length > 0 ? product.reviews.map((review, i) => (
                                    <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="font-semibold">{review.author}</p>
                                            <span className="text-sm text-gray-500">{review.date}</span>
                                        </div>
                                        <StarRating rating={review.rating} />
                                        <p className="text-gray-700 mt-2">{review.comment}</p>
                                    </div>
                                )) : (
                                    <p className="text-gray-600">No reviews yet. Be the first to share your thoughts!</p>
                                )}
                             </div>
                        </div>

                        {/* Write Review Form */}
                        <div className="bg-brand-secondary/30 p-8 rounded-lg h-fit">
                            <h3 className="text-xl font-bold text-brand-dark mb-4">Write a Review</h3>
                            <form onSubmit={handleSubmitReview} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Your Name</label>
                                    <input 
                                        type="text" 
                                        value={reviewerName}
                                        onChange={(e) => setReviewerName(e.target.value)}
                                        className="mt-1 w-full border rounded-md p-2"
                                        placeholder={user ? user.name : "Enter your name"}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                                    <div className="flex space-x-1 mt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button 
                                                key={star} 
                                                type="button" 
                                                onClick={() => setRating(star)}
                                                className={`text-2xl focus:outline-none ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Review</label>
                                    <textarea 
                                        rows={4}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="mt-1 w-full border rounded-md p-2"
                                        placeholder="How was the product?"
                                        required
                                    />
                                </div>
                                <Button type="submit" disabled={isSubmittingReview} className="w-full">
                                    {isSubmittingReview ? "Submitting..." : "Submit Review"}
                                </Button>
                            </form>
                        </div>
                     </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetailPage;
