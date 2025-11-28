
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { motion } from 'framer-motion';

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { blogPosts } = useData();
    
    // Convert blog post ID to string for comparison
    const post = blogPosts.find(p => String(p.id) === id);

    if (!post) {
        return (
            <div className="min-h-screen bg-brand-light flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Post not found</h2>
                    <Link to="/blog" className="text-brand-primary mt-4 inline-block hover:underline">&larr; Back to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-brand-light min-h-screen pb-16">
            <motion.div 
                className="w-full h-64 md:h-96 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center px-4">
                        <motion.h1 
                            className="text-3xl md:text-5xl font-serif font-bold text-white mb-4"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {post.title}
                        </motion.h1>
                        <p className="text-white text-lg">By {post.author} &bull; {post.date}</p>
                    </div>
                </div>
            </motion.div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <motion.div 
                    className="bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="prose prose-lg text-gray-700 mx-auto whitespace-pre-line">
                        {post.content}
                    </div>
                    
                    <div className="mt-12 pt-8 border-t border-gray-200">
                         <Link to="/blog" className="text-brand-primary font-semibold hover:underline">&larr; Back to all articles</Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogDetailPage;
