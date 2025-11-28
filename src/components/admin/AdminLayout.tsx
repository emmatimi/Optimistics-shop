
import React from 'react';
import { NavLink, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminBlog from './AdminBlog';

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
            <aside className="w-full md:w-64 bg-white shadow-md md:h-screen sticky top-0 z-10 flex-shrink-0">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-serif font-bold text-brand-dark">Dashboard</h2>
                    <p className="text-xs text-gray-500 mt-1">Optimistics Admin</p>
                </div>
                <nav className="p-4 space-y-2">
                    {/* Use absolute paths to avoid routing ambiguity */}
                    <AdminSidebarItem to="/admin" end>Overview</AdminSidebarItem>
                    <AdminSidebarItem to="/admin/products">Products</AdminSidebarItem>
                    <AdminSidebarItem to="/admin/orders">Orders</AdminSidebarItem>
                    <AdminSidebarItem to="/admin/blog">Blog</AdminSidebarItem>
                    <div className="pt-4 mt-4 border-t">
                        <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                            Logout
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-6 md:p-10 overflow-auto">
                <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="blog" element={<AdminBlog />} />
                    <Route path="*" element={<Navigate to="." replace />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminLayout;
