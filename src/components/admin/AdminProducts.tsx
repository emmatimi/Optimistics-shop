
import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import Button from '../ui/Button';
import type { Product } from '../../types';
import ImageUpload from '../ui/ImageUpload';

const AdminProducts: React.FC = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useData();
    const [isEditing, setIsEditing] = useState(false);
    // Use any for form state to handle string inputs for array fields temporarily
    const [currentProduct, setCurrentProduct] = useState<any>({});

    // Simple ID generator
    const generateId = () => Math.random().toString(36).substr(2, 9);

    const handleEdit = (product: Product) => {
        // Convert array fields to strings for the input form
        setCurrentProduct({
            ...product,
            ingredients: product.ingredients ? product.ingredients.join(', ') : '',
            benefits: product.benefits ? product.benefits.join(', ') : '',
            tags: product.tags ? product.tags.join(', ') : '',
            categories: product.categories || ['Skincare'], // Default to array
            isBestseller: product.isBestseller || false,
            inStock: product.inStock !== false // Default to true if undefined
        });
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentProduct({
            id: '',
            name: '',
            price: 0,
            size: '',
            categories: ['Skincare'],
            description: '',
            imageUrl: '',
            images: [],
            ingredients: '',
            benefits: '',
            usage: '',
            reviews: [],
            tags: '',
            isBestseller: false,
            inStock: true
        });
        setIsEditing(true);
    };

    const handleDelete = (id: string) => {
        if(window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const productData: Product = {
            ...currentProduct,
            categories: Array.isArray(currentProduct.categories) ? currentProduct.categories : [currentProduct.categories],
            ingredients: typeof currentProduct.ingredients === 'string' ? currentProduct.ingredients.split(',').map((s: string) => s.trim()).filter(Boolean) : currentProduct.ingredients || [],
            benefits: typeof currentProduct.benefits === 'string' ? currentProduct.benefits.split(',').map((s: string) => s.trim()).filter(Boolean) : currentProduct.benefits || [],
            tags: typeof currentProduct.tags === 'string' ? currentProduct.tags.split(',').map((s: string) => s.trim()).filter(Boolean) : currentProduct.tags || [],
            images: currentProduct.imageUrl ? [currentProduct.imageUrl] : []
        };

        if (currentProduct.id) {
            updateProduct(productData);
        } else {
            addProduct({ ...productData, id: generateId() });
        }
        setIsEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentProduct((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCurrentProduct((prev: any) => ({ ...prev, [name]: checked }));
    };

    if (isEditing) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">{currentProduct.id ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input name="name" value={currentProduct.name} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Price (₦)</label>
                            <input name="price" type="number" value={currentProduct.price} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Size (e.g., 100ml)</label>
                            <input name="size" value={currentProduct.size} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select name="categories" value={currentProduct.categories?.[0] || 'Skincare'} onChange={(e) => setCurrentProduct({...currentProduct, categories: [e.target.value]})} className="mt-1 block w-full border rounded-md p-2">
                                <option value="Skincare">Skincare</option>
                                <option value="Hair Growth">Hair Growth</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <ImageUpload 
                            label="Product Image" 
                            value={currentProduct.imageUrl} 
                            onChange={(url) => setCurrentProduct((prev: any) => ({ ...prev, imageUrl: url }))}
                            folder="products"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" value={currentProduct.description} onChange={handleInputChange} rows={3} className="mt-1 block w-full border rounded-md p-2" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Usage Instructions</label>
                        <textarea name="usage" value={currentProduct.usage} onChange={handleInputChange} rows={2} className="mt-1 block w-full border rounded-md p-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Ingredients (comma separated)</label>
                            <input name="ingredients" value={currentProduct.ingredients} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Benefits (comma separated)</label>
                            <input name="benefits" value={currentProduct.benefits} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 mt-4">
                        <div className="flex items-center">
                            <input
                                id="isBestseller"
                                name="isBestseller"
                                type="checkbox"
                                checked={currentProduct.isBestseller || false}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                            />
                            <label htmlFor="isBestseller" className="ml-2 block text-sm text-gray-900">
                                Mark as Best Seller
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="inStock"
                                name="inStock"
                                type="checkbox"
                                checked={currentProduct.inStock !== false}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                            />
                            <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
                                Available in Stock
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button type="submit">Save Product</Button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif font-bold text-brand-dark">Products</h1>
                <Button onClick={handleAddNew}>+ Add Product</Button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full object-cover" src={product.imageUrl} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="flex items-center">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                {product.isBestseller && (
                                                    <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        Best Seller
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-500">{product.size}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.inStock !== false ? (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            In Stock
                                        </span>
                                    ) : (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                            Out of Stock
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {product.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(product)} className="text-brand-primary hover:text-brand-dark mr-4">Edit</button>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;
