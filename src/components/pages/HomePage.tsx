import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import ProductCard from '../ProductCard';
import { useData } from '../../contexts/DataContext';
import MetaTags from '../ui/MetaTags'; // Import

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

const HeroSection = () => (
    <div className="bg-brand-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center">
            <motion.div 
                className="md:w-1/2 text-center md:text-left mb-10 md:mb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="font-serif text-4xl md:text-6xl font-bold text-brand-primary leading-tight">
                    Unlock Your Natural Radiance.
                </h1>
                <p className="mt-4 text-lg text-brand-dark max-w-xl mx-auto md:mx-0">
                    Discover the power of pure, cold-pressed oils. Handcrafted with love to nourish your skin and hair, naturally.
                </p>
                <motion.div 
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Button to="/shop" variant="primary">
                        Shop Now
                    </Button>
                </motion.div>
            </motion.div>
            <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <img src="https://ik.imagekit.io/4lndq5ke52/bg3-removebg-preview.png?q=80&w=600&auto=format&fit=crop" alt="Natural oils" className="rounded-lg shadow-2xl" />
            </motion.div>
        </div>
    </div>
);

const BestSellersSection = () => {
    const { products } = useData();
    const bestsellers = products.filter(p => p.isBestseller).slice(0, 4);
    
    return (
        <section className="py-16 bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={itemVariants}
                >
                    <h2 className="text-3xl font-serif font-bold text-center text-brand-dark mb-2">Our Best Sellers</h2>
                    <p className="text-center text-gray-600 mb-10">Loved by our community, for results you can see and feel.</p>
                </motion.div>
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {bestsellers.map(product => (
                        <motion.div 
                            key={product.id} 
                            variants={itemVariants}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
                 <motion.div 
                    className="text-center mt-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={itemVariants}
                >
                    <Button to="/shop" variant="secondary">View All Products</Button>
                </motion.div>
            </div>
        </section>
    );
};

const WhyChooseUsSection = () => (
    <section className="bg-brand-secondary py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView="visible"
                viewport={{ once: true }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <img src="https://ik.imagekit.io/4lndq5ke52/images/about.png?q=80&w=500&auto=format&fit=crop" alt="Making natural oils" className="rounded-lg shadow-xl"/>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView="visible"
                viewport={{ once: true }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Crafted with Purity and Purpose</h2>
                <p className="text-gray-600 mb-6">We started Optimistics Naturals with a simple belief: nature provides everything we need to heal and thrive. Our oils are more than just products; they are a promise of purity, efficacy, and ethical craftsmanship.</p>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <span className="text-brand-primary mr-3 mt-1">&#10003;</span>
                        <p><span className="font-semibold">Cold-Pressed Perfection:</span> We extract our oils without heat to preserve every potent nutrient and enzyme.</p>
                    </div>
                    <div className="flex items-start">
                         <span className="text-brand-primary mr-3 mt-1">&#10003;</span>
                        <p><span className="font-semibold">Pure & Cruelty-Free:</span> 100% pure extracts, no additives, and a firm stance against animal testing.</p>
                    </div>
                     <div className="flex items-start">
                         <span className="text-brand-primary mr-3 mt-1">&#10003;</span>
                        <p><span className="font-semibold">Locally Crafted:</span> Small batches made with care to ensure the highest quality and freshness.</p>
                    </div>
                </div>
                <Button to="/about" variant="outline" className="mt-8">Learn Our Story</Button>
            </motion.div>
        </div>
    </section>
);

const TestimonialsSection = () => {
    const { testimonials } = useData();

    return (
        <section className="py-16 bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-serif font-bold text-center text-brand-dark mb-10">What Our Customers Say</h2>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {testimonials.slice(0, 3).map(testimonial => (
                        <motion.div key={testimonial.id} variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md text-center">
                            <img src={testimonial.imageUrl} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
                            <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                            <p className="font-semibold text-brand-dark">{testimonial.name}</p>
                            <p className="text-sm text-gray-500">{testimonial.location}</p>
                        </motion.div>
                    ))}
                </motion.div>
                <div className="text-center mt-10">
                    <Button to="/testimonials" variant="outline">Read More Stories</Button>
                </div>
            </div>
        </section>
    );
};

const HomePage: React.FC = () => {
    return (
        <div>
            <MetaTags 
                title="Natural Oils for Skin & Hair" 
                description="Discover pure, cold-pressed oils for glowing skin and healthy hair growth. Shop Optimistics Naturals." 
            />
            <HeroSection />
            <BestSellersSection />
            <WhyChooseUsSection />
            <TestimonialsSection />
        </div>
    );
};

export default HomePage;