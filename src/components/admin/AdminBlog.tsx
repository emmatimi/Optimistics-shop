import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useNotification } from '../../contexts/NotificationContext';
import Button from '../ui/Button';
import ImageUpload from '../ui/ImageUpload';
import ConfirmModal from '../ui/ConfirmModal';

const AdminBlog: React.FC = () => {
    const { blogPosts, addBlogPost, deleteBlogPost } = useData();
    const { showNotification } = useNotification();
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState({
        title: '',
        excerpt: '',
        imageUrl: '',
        author: 'Optimistics Team',
        content: '',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    });

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | number | null>(null);

    const handleAddNew = () => {
        setCurrentPost({
            title: '',
            excerpt: '',
            imageUrl: '',
            author: 'Optimistics Team',
            content: '',
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        });
        setIsEditing(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addBlogPost(currentPost);
            showNotification('Blog post published!', 'success');
            setIsEditing(false);
        } catch (error) {
            showNotification('Failed to publish post.', 'error');
        }
    };

    const handleDeleteClick = (id: number | string) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            try {
                await deleteBlogPost(deleteId);
                showNotification('Post deleted.', 'info');
            } catch (error) {
                showNotification('Failed to delete post.', 'error');
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCurrentPost(prev => ({ ...prev, [name]: value }));
    };

    if (isEditing) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Write New Article</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input name="title" value={currentPost.title} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required />
                    </div>
                    <div>
                         <ImageUpload 
                            label="Cover Image" 
                            value={currentPost.imageUrl} 
                            onChange={(url) => setCurrentPost(prev => ({ ...prev, imageUrl: url }))}
                            folder="blog"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author</label>
                        <input name="author" value={currentPost.author} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Excerpt (Short description)</label>
                        <textarea name="excerpt" value={currentPost.excerpt} onChange={handleInputChange} rows={2} className="mt-1 block w-full border rounded-md p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Content</label>
                        <textarea name="content" value={currentPost.content} onChange={handleInputChange} rows={10} className="mt-1 block w-full border rounded-md p-2" required />
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-6">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button type="submit">Publish Post</Button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif font-bold text-brand-dark">Blog Posts</h1>
                <Button onClick={handleAddNew}>+ New Post</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map(post => (
                    <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden border">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-1 truncate">{post.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                            <button onClick={() => handleDeleteClick(post.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete Post</button>
                        </div>
                    </div>
                ))}
            </div>
            {blogPosts.length === 0 && (
                <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="mb-4">No blog posts found.</p>
                    <Button onClick={handleAddNew} variant="outline">Create Your First Post</Button>
                </div>
            )}

            <ConfirmModal 
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Post"
                message="Are you sure you want to delete this blog post?"
            />
        </div>
    );
};

export default AdminBlog;