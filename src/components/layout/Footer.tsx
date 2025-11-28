
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const SocialIcon: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-brand-accent transition-colors">
        {children}
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-secondary border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <h3 className="font-serif text-lg font-bold text-brand-primary mb-4">Optimistics Naturals</h3>
                        <p className="text-sm text-gray-600">Pure, potent, and plant-based oils for your natural radiance.</p>
                        <div className="flex space-x-4 mt-4">
                           <SocialIcon href="https://www.instagram.com/optimisticnaturals?igsh=MXczenpneTR3cWUxbQ==">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.5,3.5c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5S15.328,3.5,14.5,3.5z M10,14.5c0-2.485,2.015-4.5,4.5-4.5S19,12.015,19,14.5S16.985,19,14.5,19S10,16.985,10,14.5z M4,5c-1.105,0-2,0.895-2,2v12c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V7c0-1.105-0.895-2-2-2H4z M14.5,7c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5S18.642,7,14.5,7z"/></svg>
                            </SocialIcon>
                            <SocialIcon href="https://facebook.com">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                            </SocialIcon>
                              <SocialIcon href="https://wa.me/2349065388881">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.956-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.888-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                </svg>
                            </SocialIcon>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/shop" className="text-gray-600 hover:text-brand-primary">Shop All</Link></li>
                            <li><Link to="/about" className="text-gray-600 hover:text-brand-primary">Our Story</Link></li>
                            <li><Link to="/blog" className="text-gray-600 hover:text-brand-primary">Blog</Link></li>
                            <li><Link to="/policy" className="text-gray-600 hover:text-brand-primary">Shipping & Returns</Link></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-gray-800 mb-4">Customer Care</h3>
                        <ul className="space-y-2 text-sm">
                             <li><Link to="/contact" className="text-gray-600 hover:text-brand-primary">Contact Us</Link></li>
                            <li><Link to="/faq" className="text-gray-600 hover:text-brand-primary">FAQs</Link></li>
                             <li><Link to="/account" className="text-gray-600 hover:text-brand-primary">My Account</Link></li>
                             <li><Link to="/loyalty" className="text-gray-600 hover:text-brand-primary">Loyalty Program</Link></li>
                        </ul>
                    </div>
                    <div>
                         <h3 className="font-semibold text-gray-800 mb-4">Newsletter</h3>
                         <p className="text-sm text-gray-600 mb-4">Get 10% off your first order and stay up to date on new products and tips.</p>
                         <form onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input type="email" placeholder="Your email" className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"/>
                                <Button type="submit" className="w-full sm:w-auto">Subscribe</Button>
                            </div>
                         </form>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Optimistics Naturals. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
