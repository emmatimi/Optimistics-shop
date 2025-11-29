import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    type?: 'danger' | 'success' | 'info';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmLabel = 'Confirm',
    type = 'danger'
}) => {
    const buttonClass = type === 'danger' 
        ? 'bg-red-600 hover:bg-red-700 border-red-600 focus:ring-red-600'
        : type === 'success'
        ? 'bg-brand-primary hover:bg-green-700 border-brand-primary focus:ring-green-600'
        : 'bg-blue-600 hover:bg-blue-700 border-blue-600 focus:ring-blue-600';

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
                    >
                        <h3 className="text-xl font-bold text-brand-dark mb-2">{title}</h3>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <div className="flex justify-end space-x-3">
                            <Button variant="outline" onClick={onClose} className="px-4 py-2">
                                Cancel
                            </Button>
                            <Button 
                                variant="primary" 
                                onClick={() => { onConfirm(); onClose(); }}
                                className={`px-4 py-2 ${buttonClass}`}
                            >
                                {confirmLabel}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;