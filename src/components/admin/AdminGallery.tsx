import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useNotification } from '../../contexts/NotificationContext';
import Button from '../ui/Button';
import ImageUpload from '../ui/ImageUpload';
import ConfirmModal from '../ui/ConfirmModal';

const AdminGallery: React.FC = () => {
    const { galleryImages, addGalleryImage, deleteGalleryImage } = useData();
    const { showNotification } = useNotification();
    const [isEditing, setIsEditing] = useState(false);
    const [currentImage, setCurrentImage] = useState({
        beforeUrl: '',
        afterUrl: '',
        description: ''
    });

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | number | null>(null);

    const handleAddNew = () => {
        setCurrentImage({
            beforeUrl: '',
            afterUrl: '',
            description: ''
        });
        setIsEditing(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addGalleryImage(currentImage);
            showNotification('Result added to gallery!', 'success');
            setIsEditing(false);
        } catch (error) {
            showNotification('Failed to add result.', 'error');
        }
    };

    const handleDeleteClick = (id: number | string) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            try {
                await deleteGalleryImage(deleteId);
                showNotification('Result deleted.', 'info');
            } catch (error) {
                showNotification('Failed to delete result.', 'error');
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentImage(prev => ({ ...prev, [name]: value }));
    };

    if (isEditing) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Add New Result</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                         <ImageUpload 
                            label="Before Image" 
                            value={currentImage.beforeUrl} 
                            onChange={(url) => setCurrentImage(prev => ({ ...prev, beforeUrl: url }))}
                            folder="gallery/before"
                        />
                    </div>
                    <div>
                         <ImageUpload 
                            label="After Image" 
                            value={currentImage.afterUrl} 
                            onChange={(url) => setCurrentImage(prev => ({ ...prev, afterUrl: url }))}
                            folder="gallery/after"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description / Duration</label>
                        <input name="description" value={currentImage.description} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required placeholder="e.g. 3 months of using Hair Oil" />
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-6">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button type="submit">Add Result</Button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif font-bold text-brand-dark">Results Gallery</h1>
                <Button onClick={handleAddNew}>+ Add Result</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map(img => (
                    <div key={img.id} className="bg-white rounded-lg shadow-md overflow-hidden border relative">
                         <button 
                            onClick={() => handleDeleteClick(img.id)} 
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 z-10 hover:bg-red-600 shadow"
                            title="Delete"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <div className="grid grid-cols-2 h-40">
                            <div className="relative border-r">
                                <img src={img.beforeUrl} alt="Before" className="w-full h-full object-cover"/>
                                <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1 rounded">BEFORE</span>
                            </div>
                            <div className="relative">
                                <img src={img.afterUrl} alt="After" className="w-full h-full object-cover"/>
                                <span className="absolute bottom-1 left-1 bg-brand-primary/80 text-white text-[10px] px-1 rounded">AFTER</span>
                            </div>
                        </div>
                        <div className="p-3 bg-gray-50 text-center">
                            <p className="text-sm font-medium text-gray-800">{img.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            {galleryImages.length === 0 && (
                <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="mb-4">No results added yet.</p>
                    <Button onClick={handleAddNew} variant="outline">Add First Result</Button>
                </div>
            )}

            <ConfirmModal 
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Result"
                message="Are you sure you want to delete this result image?"
            />
        </div>
    );
};

export default AdminGallery;