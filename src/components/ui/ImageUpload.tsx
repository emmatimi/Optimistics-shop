import React, { useState, useRef } from 'react';
import { useNotification } from '../../contexts/NotificationContext';

interface ImageUploadProps {
    label: string;
    value: string;
    onChange: (url: string) => void;
    folder?: string; // Kept for interface compatibility
    className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, value, onChange, className = '' }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { showNotification } = useNotification();

    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800; // Resize to max 800px width
                    const scaleSize = MAX_WIDTH / img.width;
                    
                    // Only resize if image is larger than MAX_WIDTH
                    if (scaleSize < 1) {
                        canvas.width = MAX_WIDTH;
                        canvas.height = img.height * scaleSize;
                    } else {
                        canvas.width = img.width;
                        canvas.height = img.height;
                    }

                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

                    // Compress to JPEG with 0.7 quality to reduce file size significantly
                    // This typically results in a string size safe for Firestore (<< 1MB)
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(compressedDataUrl);
                };
                img.onerror = (error) => reject(error);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleFile = async (file: File) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            showNotification('Please upload an image file (PNG, JPG, JPEG).', 'error');
            return;
        }

        setIsUploading(true);
        try {
            // New Logic: Compress Image instead of raw upload
            const compressedBase64 = await compressImage(file);
            
            // Check final size (approx < 1MB safe for Firestore document field)
            if (compressedBase64.length > 1000000) {
                 showNotification('Image is too complex to compress safely. Please try a simpler image.', 'error');
                 setIsUploading(false);
                 return;
            }

            onChange(compressedBase64);
            showNotification('Image processed and ready!', 'success');
        } catch (error) {
            console.error("Processing failed:", error);
            showNotification('Failed to process image. Please try again.', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const onClick = () => {
        fileInputRef.current?.click();
    };

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            
            <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors relative overflow-hidden ${
                    isDragging ? 'border-brand-primary bg-brand-primary/10' : 'border-gray-300 hover:border-brand-primary hover:bg-gray-50'
                }`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={onClick}
            >
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={onFileInputChange} 
                    accept="image/*" 
                    className="hidden" 
                />

                {isUploading ? (
                    <div className="flex flex-col items-center justify-center py-4">
                        <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                        <p className="text-sm text-brand-dark">Compressing...</p>
                    </div>
                ) : value ? (
                    <div className="relative group">
                        <img src={value} alt="Preview" className="h-48 w-full object-contain rounded-md mx-auto" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                            <p className="text-white font-medium">Click or Drop to Replace</p>
                        </div>
                    </div>
                ) : (
                    <div className="py-8">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-1 text-sm text-gray-600">
                            <span className="font-medium text-brand-primary">Click to Upload</span>
                        </p>
                        <p className="text-xs text-gray-500">Auto-compressed for fast loading</p>
                    </div>
                )}
            </div>
            {value && (
                <div className="flex justify-end">
                    <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); onChange(''); }}
                        className="text-xs text-red-600 hover:text-red-800 underline"
                    >
                        Remove Image
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;