import React from 'react';
import { motion } from 'framer-motion';

const Section: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <motion.section
        className={`py-16 ${className}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
    >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </motion.section>
);

const AboutPage: React.FC = () => {
    return (
        <div className="bg-brand-light">
            <div className="bg-brand-secondary text-center py-16">
                <motion.h1 
                    className="text-4xl md:text-5xl font-serif font-bold text-brand-primary"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Our Story
                </motion.h1>
                <motion.p 
                    className="mt-4 text-lg text-brand-dark max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    From a personal quest for purity to a passion for sharing nature's gifts.
                </motion.p>
            </div>

            <Section>
                <div className="grid md:grid-cols-5 gap-12 items-center">
                    <div className="md:col-span-3">
                        <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Why We Started</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Optimistics Naturals was born from a simple, yet profound realization: the best ingredients for our bodies come directly from the earth. Frustrated by skincare and haircare products filled with synthetic chemicals and unpronounceable ingredients, our founder, Opeyemi Adepoju, embarked on a journey to find a better way.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            This journey led her back to her roots, to the ancient wisdom of using pure, cold-pressed oils. She saw firsthand the transformative power of these natural elixirs on her own skin and hair. What started as a personal project soon grew into a mission: to create a line of truly natural, effective, and accessible products that people could trust.
                        </p>
                    </div>
                    <div className="md:col-span-2">
                        <img src="https://ik.imagekit.io/4lndq5ke52/images/about-image.jpg?q=80&w=500&auto=format&fit=crop" alt="Founder with natural ingredients" className="rounded-lg shadow-xl w-full h-auto object-cover aspect-[4/5]" />
                    </div>
                </div>
            </Section>

            <Section className="bg-brand-secondary">
                <h2 className="text-3xl font-serif font-bold text-brand-dark text-center mb-10">What Makes Our Oils Special</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-brand-primary mb-2">Cold-Pressed</h3>
                        <p className="text-gray-600">We use a meticulous cold-pressing method to ensure that all the vital nutrients and antioxidants in our oils are preserved, delivering maximum potency.</p>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-brand-primary mb-2">Pure Extracts</h3>
                        <p className="text-gray-600">No fillers, no fragrances, no compromises. Just 100% pure, plant-based ingredients you can trust on your skin and hair.</p>
                    </div>
                     <div className="p-6">
                        <h3 className="text-xl font-semibold text-brand-primary mb-2">Cruelty-Free</h3>
                        <p className="text-gray-600">We believe in kindness to all beings. Our products are, and always will be, vegan and never tested on animals.</p>
                    </div>
                     <div className="p-6">
                        <h3 className="text-xl font-semibold text-brand-primary mb-2">Locally Crafted</h3>
                        <p className="text-gray-600">We produce in small, artisanal batches to maintain the highest standards of quality and freshness, from our hands to yours.</p>
                    </div>
                </div>
            </Section>

            <Section>
                 <div className="grid md:grid-cols-5 gap-12 items-center">
                     <div className="md:col-span-2 md:order-first">
                        <img src="https://ik.imagekit.io/4lndq5ke52/images/1752880279421.jpg?q=80&w=500&auto=format&fit=crop" alt="Natural oil product with leaves" className="rounded-lg shadow-xl w-full h-auto object-cover aspect-[4/5]" />
                    </div>
                    <div className="md:col-span-3">
                        <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Our Mission & Values</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                           Our mission is to empower you to embrace your natural beauty with confidence. We are committed to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li><strong>Transparency:</strong> Honest ingredients and clear communication.</li>
                            <li><strong>Efficacy:</strong> Creating products that deliver visible, tangible results.</li>
                            <li><strong>Sustainability:</strong> Sourcing ethically and using eco-friendly packaging wherever possible.</li>
                            <li><strong>Community:</strong> Building a supportive community that celebrates natural wellness and self-care.</li>
                        </ul>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default AboutPage;