
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 100 }
  }
};

const BlogPage: React.FC = () => {
    const { blogPosts } = useData();

    return (
        <div className="bg-brand-light min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                     <motion.h1 
                        className="text-4xl font-serif font-bold text-brand-dark"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Our Journal
                    </motion.h1>
                    <motion.p 
                        className="text-gray-600 mt-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Tips, tricks, and insights for your natural beauty journey.
                    </motion.p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {blogPosts.map((post) => (
                        <motion.div 
                            key={post.id} 
                            className="bg-white rounded-lg shadow-md overflow-hidden group"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                        >
                            <Link to={`/blog/${post.id}`} className="block h-full flex flex-col">
                                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                                <div className="p-6 flex flex-col flex-grow">
                                    <p className="text-sm text-gray-500 mb-1">{post.date} &bull; {post.author}</p>
                                    <h2 className="text-xl font-serif font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{post.title}</h2>
                                    <p className="text-gray-600 mt-2 flex-grow">{post.excerpt}</p>
                                    <span className="text-brand-primary font-semibold mt-4 inline-block">Read More &rarr;</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default BlogPage;
