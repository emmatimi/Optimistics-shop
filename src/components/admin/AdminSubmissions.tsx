import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useNotification } from '../../contexts/NotificationContext';
import Button from '../ui/Button';
import ConfirmModal from '../ui/ConfirmModal';

const AdminSubmissions: React.FC = () => {
    const { submissions, approveSubmission, deleteSubmission } = useData();
    const { showNotification } = useNotification();
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        type: 'danger' | 'success';
        confirmLabel: string;
        action: () => Promise<void>;
    }>({
        isOpen: false,
        title: '',
        message: '',
        type: 'danger',
        confirmLabel: 'Confirm',
        action: async () => {},
    });

    const pendingSubmissions = submissions.filter(s => s.status === 'pending');

    const openConfirm = (title: string, message: string, type: 'danger' | 'success', label: string, action: () => Promise<void>) => {
        setConfirmModal({
            isOpen: true,
            title,
            message,
            type,
            confirmLabel: label,
            action
        });
    };

    const handleApprove = (submission: any) => {
        openConfirm(
            'Approve Submission',
            'Are you sure you want to approve this story? It will be published to the site immediately.',
            'success',
            'Approve & Publish',
            async () => {
                try {
                    await approveSubmission(submission);
                    showNotification('Story approved and published!', 'success');
                } catch (error) {
                    showNotification('Failed to approve story.', 'error');
                }
            }
        );
    }

    const handleDelete = (id: string) => {
        openConfirm(
            'Delete Submission',
            'Are you sure you want to permanently delete this submission? This cannot be undone.',
            'danger',
            'Delete',
            async () => {
                try {
                    await deleteSubmission(id);
                    showNotification('Submission deleted.', 'info');
                } catch (error) {
                    showNotification('Failed to delete submission.', 'error');
                }
            }
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-brand-dark">Inbox: Customer Stories</h1>
            <p className="text-gray-600">Review testimonials and results submitted by customers.</p>

            <div className="grid gap-6">
                {pendingSubmissions.length > 0 ? pendingSubmissions.map(sub => (
                    <div key={sub.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-brand-primary">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="flex-grow">
                                <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${sub.type === 'testimonial' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                                    {sub.type}
                                </span>
                                <h3 className="text-xl font-bold mt-2">{sub.customerName} <span className="text-sm font-normal text-gray-500">({sub.email})</span></h3>
                                <p className="text-sm text-gray-500 mb-4">{new Date(sub.date).toLocaleDateString()} &bull; {sub.location}</p>
                                <p className="bg-gray-50 p-4 rounded text-gray-700 italic border border-gray-100">"{sub.content}"</p>
                                {sub.imageUrl && (
                                    <div className="mt-4">
                                        <p className="text-xs text-gray-500 mb-1 font-semibold">Attached Photo:</p>
                                        <img src={sub.imageUrl} alt="User Submission" className="h-32 w-auto object-contain rounded border border-gray-200 bg-gray-50" />
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto flex-shrink-0">
                                <Button onClick={() => handleApprove(sub)} className="text-xs whitespace-nowrap">Approve & Publish</Button>
                                <button 
                                    onClick={() => handleDelete(sub.id)} 
                                    className="px-4 py-2 border border-red-200 text-red-600 rounded hover:bg-red-50 text-xs font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow border-2 border-dashed border-gray-200">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="mt-2 text-gray-500 font-medium">Inbox is empty</p>
                        <p className="text-sm text-gray-400">New customer stories will appear here.</p>
                    </div>
                )}
            </div>

            <ConfirmModal 
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmModal.action}
                title={confirmModal.title}
                message={confirmModal.message}
                type={confirmModal.type}
                confirmLabel={confirmModal.confirmLabel}
            />
        </div>
    );
};

export default AdminSubmissions;