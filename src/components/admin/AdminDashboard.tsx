
import React from 'react';
import { useData } from '../../contexts/DataContext';
import { motion } from 'framer-motion';

const StatCard: React.FC<{ title: string, value: string | number, color: string, icon?: React.ReactNode }> = ({ title, value, color, icon }) => (
    <motion.div 
        className="bg-white p-6 rounded-lg shadow-md border-l-4"
        style={{ borderLeftColor: color }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-500 font-medium uppercase">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">{value}</h3>
            </div>
            {icon && <div className={`p-3 rounded-full bg-opacity-20`} style={{ backgroundColor: color }}>{icon}</div>}
        </div>
    </motion.div>
);

const AdminDashboard: React.FC = () => {
    const { products, orders } = useData();

    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    const pendingOrders = orders.filter(o => o.status === 'Processing').length;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-serif font-bold text-brand-dark">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Revenue" 
                    value={totalRevenue.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })} 
                    color="#4a634e"
                />
                <StatCard 
                    title="Total Orders" 
                    value={orders.length} 
                    color="#c7a78c"
                />
                <StatCard 
                    title="Pending Orders" 
                    value={pendingOrders} 
                    color="#F59E0B"
                />
                <StatCard 
                    title="Total Products" 
                    value={products.length} 
                    color="#3B82F6"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b bg-gray-50">
                        <h3 className="font-semibold text-gray-700">Recent Orders</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="uppercase tracking-wider border-b bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.slice(0, 5).map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{order.id.slice(-6)}</td>
                                        <td className="px-6 py-4">{order.customerName}</td>
                                        <td className="px-6 py-4">{order.total.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                                ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                                                  'bg-gray-100 text-gray-800'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No orders yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
