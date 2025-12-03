import React from 'react';
import { NavLink, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminBlog from './AdminBlog';
import AdminGallery from './AdminGallery';
import AdminTestimonials from './AdminTestimonials';
import AdminSubmissions from './AdminSubmissions';
import AdminShipping from './AdminShipping'; // New Import

const AdminSidebarItem: React.FC<{ to: string, children: React.ReactNode, end?: boolean }> = ({ to, children, end }) => (
    <NavLink 
        to={to} 
        end={end}
        className={({ isActive }) => 
            `block px-4 py-3 rounded-md transition-colors ${
                isActive ? 'bg-brand-primary text-white hover:bg-brand-primary hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-brand-dark'
            }`
        }
    >
        {children}
    </NavLink>
);

const AdminLayout: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white shadow-md md:h-screen sticky top-0 z-10 flex-shrink-0 flex flex-col">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-serif font-bold text-brand-dark">Dashboard</h2>
                    <p className="text-xs text-gray-500 mt-1">Optimistics Admin</p>
                </div>
                <nav className="p-4 space-y-2 flex-grow overflow-y-auto">
                    <AdminSidebarItem to="/admin" end>Overview</AdminSidebarItem>
                    <AdminSidebarItem to="/admin/orders">Orders</AdminSidebarItem>
                    <AdminSidebarItem to="/admin/products">Products</AdminSidebarItem>
                    <AdminSidebarItem to="/admin/shipping">Shipping Rates</AdminSidebarItem> {/* New Link */}
                    <AdminSidebarItem to="/admin/submissions">Inbox (Stories)</AdminSidebarItem>
                    <AdminSidebarItem to="/admin/blog">Blog</AdminSidebarItem>
                    <AdminSidebarItem to="/admin/gallery">Results</AdminSidebarItem>
                    <AdminSidebarItem to="/admin/testimonials">Testimonials</AdminSidebarItem>
                </nav>
                
                <div className="p-4 border-t bg-gray-50 mt-auto">
                    <NavLink 
                        to="/" 
                        className="block px-4 py-3 rounded-md text-brand-primary hover:bg-brand-primary/10 font-medium mb-2 transition-colors flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Website
                    </NavLink>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-6 md:p-10 overflow-auto">
                <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="blog" element={<AdminBlog />} />
                    <Route path="gallery" element={<AdminGallery />} />
                    <Route path="testimonials" element={<AdminTestimonials />} />
                    <Route path="submissions" element={<AdminSubmissions />} />
                    <Route path="shipping" element={<AdminShipping />} /> {/* New Route */}
                    <Route path="*" element={<Navigate to="." replace />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminLayout;