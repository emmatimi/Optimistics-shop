import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { useNotification } from '../../contexts/NotificationContext';
import Button from '../ui/Button';
import type { ShippingRate } from '../../types';

const NIGERIAN_STATES = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
    "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
    "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
    "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "Abuja"
];

const AdminShipping: React.FC = () => {
    const { shippingConfig, updateShippingConfig } = useData();
    const { showNotification } = useNotification();
    
    const [defaultFee, setDefaultFee] = useState(0);
    const [freeThreshold, setFreeThreshold] = useState(0);
    const [rates, setRates] = useState<ShippingRate[]>([]);
    const [newState, setNewState] = useState('');
    const [newFee, setNewFee] = useState('');

    useEffect(() => {
        if (shippingConfig) {
            setDefaultFee(shippingConfig.defaultFee);
            setFreeThreshold(shippingConfig.freeShippingThreshold);
            setRates(shippingConfig.rates || []);
        }
    }, [shippingConfig]);

    const handleSaveGeneral = async () => {
        try {
            await updateShippingConfig({
                ...shippingConfig,
                defaultFee,
                freeShippingThreshold: freeThreshold,
                rates
            });
            showNotification('Shipping settings saved!', 'success');
        } catch (error) {
            showNotification('Failed to save settings.', 'error');
        }
    };

    const handleAddRate = () => {
        if (!newState || !newFee) return;
        const feeNum = parseInt(newFee);
        
        // Check if state already exists
        if (rates.find(r => r.state === newState)) {
            showNotification('Rate for this state already exists. Delete it first to update.', 'error');
            return;
        }

        const updatedRates = [...rates, { state: newState, fee: feeNum }];
        setRates(updatedRates);
        setNewState('');
        setNewFee('');
    };

    const handleDeleteRate = (stateToDelete: string) => {
        setRates(rates.filter(r => r.state !== stateToDelete));
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <h1 className="text-3xl font-serif font-bold text-brand-dark">Shipping Configuration</h1>

            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2">General Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Default Shipping Fee (₦)</label>
                        <p className="text-xs text-gray-500 mb-2">Applied to locations without specific rates.</p>
                        <input 
                            type="number" 
                            value={defaultFee} 
                            onChange={(e) => setDefaultFee(parseInt(e.target.value))} 
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Free Shipping Threshold (₦)</label>
                        <p className="text-xs text-gray-500 mb-2">Orders above this amount get free shipping.</p>
                        <input 
                            type="number" 
                            value={freeThreshold} 
                            onChange={(e) => setFreeThreshold(parseInt(e.target.value))} 
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                </div>
                <Button onClick={handleSaveGeneral}>Save General Settings</Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2">State-Specific Rates</h2>
                
                {/* Add New Rate Form */}
                <div className="flex flex-col md:flex-row gap-4 items-end bg-gray-50 p-4 rounded-md">
                    <div className="flex-grow">
                        <label className="block text-sm font-medium text-gray-700">State / Location</label>
                        <select 
                            value={newState} 
                            onChange={(e) => setNewState(e.target.value)} 
                            className="w-full border rounded-md p-2"
                        >
                            <option value="">Select State</option>
                            {NIGERIAN_STATES.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full md:w-32">
                        <label className="block text-sm font-medium text-gray-700">Fee (₦)</label>
                        <input 
                            type="number" 
                            value={newFee} 
                            onChange={(e) => setNewFee(e.target.value)} 
                            className="w-full border rounded-md p-2"
                            placeholder="0"
                        />
                    </div>
                    <Button onClick={handleAddRate} variant="secondary">Add Rate</Button>
                </div>

                {/* Rates List */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Fee</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {rates.map((rate) => (
                                <tr key={rate.state}>
                                    <td className="px-6 py-4 text-sm text-gray-900">{rate.state}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">₦{rate.fee.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => handleDeleteRate(rate.state)} 
                                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {rates.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 text-center text-gray-500">No specific rates set. Default fee applies.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                <div className="border-t pt-4">
                     <Button onClick={handleSaveGeneral} className="w-full md:w-auto">Save All Changes</Button>
                </div>
            </div>
        </div>
    );
};

export default AdminShipping;