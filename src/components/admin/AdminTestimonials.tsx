import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useNotification } from '../../contexts/NotificationContext';
import Button from '../ui/Button';
import ImageUpload from '../ui/ImageUpload';
import ConfirmModal from '../ui/ConfirmModal';

const AdminTestimonials: React.FC = () => {
    const { testimonials, addTestimonial, deleteTestimonial } = useData();
    const { showNotification } = useNotification();
    const [isEditing, setIsEditing] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState({
        name: '',
        location: '',
        quote: '',
        imageUrl: '',
    });

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | number | null>(null);

    const handleAddNew = () => {
        setCurrentTestimonial({
            name: '',
            location: '',
            quote: '',
            imageUrl: '',
        });
        setIsEditing(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addTestimonial(currentTestimonial);
            showNotification('Testimonial added successfully!', 'success');
            setIsEditing(false);
        } catch (error) {
            showNotification('Failed to add testimonial.', 'error');
        }
    };

    const handleDeleteClick = (id: number | string) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            try {
                await deleteTestimonial(deleteId);
                showNotification('Testimonial deleted.', 'info');
            } catch (error) {
                showNotification('Failed to delete testimonial.', 'error');
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCurrentTestimonial(prev => ({ ...prev, [name]: value }));
    };

    if (isEditing) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Add New Testimonial</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                        <input name="name" value={currentTestimonial.name} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location (e.g., Lagos, Nigeria)</label>
                        <input name="location" value={currentTestimonial.location} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required />
                    </div>
                    <div>
                         <ImageUpload 
                            label="Customer Photo" 
                            value={currentTestimonial.imageUrl} 
                            onChange={(url) => setCurrentTestimonial(prev => ({ ...prev, imageUrl: url }))}
                            folder="testimonials"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quote</label>
                        <textarea name="quote" value={currentTestimonial.quote} onChange={handleInputChange} rows={3} className="mt-1 block w-full border rounded-md p-2" required />
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-6">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button type="submit">Add Testimonial</Button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif font-bold text-brand-dark">Testimonials</h1>
                <Button onClick={handleAddNew}>+ Add Testimonial</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map(t => (
                    <div key={t.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center relative border">
                        <button 
                            onClick={() => handleDeleteClick(t.id)} 
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm font-medium p-2"
                        >
                            Delete
                        </button>
                        <img src={t.imageUrl} alt={t.name} className="w-16 h-16 rounded-full mb-3 object-cover" />
                        <p className="text-gray-600 italic text-sm mb-3">"{t.quote}"</p>
                        <p className="font-bold text-brand-dark">{t.name}</p>
                        <p className="text-xs text-gray-500">{t.location}</p>
                    </div>
                ))}
            </div>
            
            {testimonials.length === 0 && (
                <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="mb-4">No testimonials yet.</p>
                    <Button onClick={handleAddNew} variant="outline">Add First Testimonial</Button>
                </div>
            )}

            <ConfirmModal 
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Testimonial"
                message="Are you sure you want to delete this testimonial?"
            />
        </div>
    );
};

export default AdminTestimonials;