import React, { createContext, useContext, useState, useEffect} from 'react';
import type { ReactNode } from 'react';
import type { Product, BlogPost, Order, GalleryImage, Testimonial, UserSubmission, Review } from '../types';
import { PRODUCTS, BLOG_POSTS, GALLERY_IMAGES, TESTIMONIALS } from '../constants';
import { db } from '../firebase';
import { 
    collection, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    setDoc,
    query, 
    where,
    increment,
    arrayUnion
} from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface DataContextType {
    products: Product[];
    blogPosts: BlogPost[];
    orders: Order[];
    galleryImages: GalleryImage[];
    testimonials: Testimonial[];
    submissions: UserSubmission[];
    addProduct: (product: Product) => Promise<void>;
    updateProduct: (product: Product) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    addOrder: (order: Order) => Promise<void>;
    updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
    deleteOrder: (id: string) => Promise<void>;
    addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
    deleteBlogPost: (id: number | string) => Promise<void>;
    addGalleryImage: (image: Omit<GalleryImage, 'id'>) => Promise<void>;
    deleteGalleryImage: (id: number | string) => Promise<void>;
    addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => Promise<void>;
    deleteTestimonial: (id: number | string) => Promise<void>;
    addProductReview: (productId: string, review: Review) => Promise<void>;
    submitUserStory: (submission: Omit<UserSubmission, 'id'>) => Promise<void>;
    approveSubmission: (submission: UserSubmission) => Promise<void>;
    deleteSubmission: (id: string) => Promise<void>;
    refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [submissions, setSubmissions] = useState<UserSubmission[]>([]);
    
    const { isAuthenticated, user, isAdmin, updateUserPoints } = useAuth();

    // ... (Seeding helpers remain the same, ommitted for brevity as they are unchanged)
    // Helper: Seed Database if empty
    const seedDatabaseIfEmpty = async (fetchedProducts: Product[]) => {
        if (fetchedProducts.length === 0) {
            console.log("Database empty. Seeding initial products...");
            try {
                for (const product of PRODUCTS) {
                    await setDoc(doc(db, 'products', product.id), product);
                }
                setProducts(PRODUCTS);
            } catch (error) {
                console.error("Error seeding products:", error);
            }
        }
    };
    
    // Helper: Seed Blog if empty
    const seedBlogIfEmpty = async (fetchedBlogs: BlogPost[]) => {
        if (fetchedBlogs.length === 0) {
            console.log("Blog empty. Seeding initial posts...");
            try {
                for (const post of BLOG_POSTS) {
                    await setDoc(doc(db, 'blog', post.id.toString()), post);
                }
                setBlogPosts(BLOG_POSTS);
            } catch (error) {
                console.error("Error seeding blog:", error);
            }
        }
    }

    // Helper: Seed Gallery if empty
    const seedGalleryIfEmpty = async (fetchedImages: GalleryImage[]) => {
        if (fetchedImages.length === 0) {
            console.log("Gallery empty. Seeding initial images...");
            try {
                for (const img of GALLERY_IMAGES) {
                    await setDoc(doc(db, 'gallery', img.id.toString()), img);
                }
                setGalleryImages(GALLERY_IMAGES);
            } catch (error) {
                console.error("Error seeding gallery:", error);
            }
        }
    }

    // Helper: Seed Testimonials if empty
    const seedTestimonialsIfEmpty = async (fetchedTestimonials: Testimonial[]) => {
        if (fetchedTestimonials.length === 0) {
            console.log("Testimonials empty. Seeding initial data...");
            try {
                for (const t of TESTIMONIALS) {
                    await setDoc(doc(db, 'testimonials', t.id.toString()), t);
                }
                setTestimonials(TESTIMONIALS);
            } catch (error) {
                console.error("Error seeding testimonials:", error);
            }
        }
    }

    const fetchData = async () => {
        try {
            const productsSnapshot = await getDocs(collection(db, 'products'));
            const productsList = productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));
            if (productsList.length === 0) await seedDatabaseIfEmpty(productsList);
            else setProducts(productsList);

            const blogSnapshot = await getDocs(collection(db, 'blog'));
            const blogList = blogSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as BlogPost));
            if (blogList.length === 0) await seedBlogIfEmpty(blogList);
            else setBlogPosts(blogList);

            const gallerySnapshot = await getDocs(collection(db, 'gallery'));
            const galleryList = gallerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as GalleryImage));
            if (galleryList.length === 0) await seedGalleryIfEmpty(galleryList);
            else setGalleryImages(galleryList);

            const testimonialsSnapshot = await getDocs(collection(db, 'testimonials'));
            const testimonialsList = testimonialsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Testimonial));
            if (testimonialsList.length === 0) await seedTestimonialsIfEmpty(testimonialsList);
            else setTestimonials(testimonialsList);
            
        } catch (error: any) {
            if (error?.code === 'permission-denied') {
                console.warn("Firestore permissions denied. Falling back to local demo data.");
            } else {
                console.error("Error fetching data:", error);
            }
            setProducts(PRODUCTS); 
            setBlogPosts(BLOG_POSTS);
            setGalleryImages(GALLERY_IMAGES);
            setTestimonials(TESTIMONIALS);
        }
    };

    const fetchOrders = async () => {
        if (!isAuthenticated || !user) {
            setOrders([]);
            return;
        }
        try {
            let q;
            if (isAdmin) {
                q = collection(db, 'orders');
            } else {
                q = query(collection(db, 'orders'), where("userId", "==", user.id));
            }
            const querySnapshot = await getDocs(q);
            const ordersList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Order));
            ordersList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setOrders(ordersList);
        } catch (e) {
            console.error("Error fetching orders:", e);
        }
    };
    
    const fetchSubmissions = async () => {
        if (!isAdmin) return;
        try {
             const subSnapshot = await getDocs(collection(db, 'submissions'));
             const subList = subSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as UserSubmission));
             setSubmissions(subList);
        } catch(e) {
            console.error("Error fetching submissions", e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchOrders();
        fetchSubmissions();
    }, [isAuthenticated, isAdmin, user]);

    // --- Actions ---

    const addProduct = async (product: Product) => {
        try {
            if (product.id) {
                await setDoc(doc(db, 'products', product.id), product);
            } else {
                await addDoc(collection(db, 'products'), product);
            }
            fetchData();
        } catch (e) { 
            console.error("Failed to add product", e);
            throw e;
        }
    };

    const updateProduct = async (updatedProduct: Product) => {
        try {
            const productRef = doc(db, 'products', updatedProduct.id);
            await updateDoc(productRef, updatedProduct as any);
            setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        } catch (e) { 
            console.error("Failed to update product", e);
            throw e;
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'products', id));
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (e) { 
            console.error("Failed to delete product", e);
            throw e;
        }
    };

    const addOrder = async (order: Order) => {
        try {
            await setDoc(doc(db, 'orders', order.id), order);
            setOrders(prev => [order, ...prev]);

            if (order.userId) {
                const pointsEarned = Math.floor(order.total / 100);
                const pointsRedeemed = order.pointsRedeemed || 0;
                const netPointsChange = pointsEarned - pointsRedeemed;

                const userRef = doc(db, 'users', order.userId);
                await updateDoc(userRef, { loyaltyPoints: increment(netPointsChange) });

                if (user && user.id === order.userId) {
                    updateUserPoints((user.loyaltyPoints || 0) + netPointsChange);
                }
            }
        } catch (e) { 
            console.error("Failed to place order", e);
            throw e;
        }
    };

    const updateOrderStatus = async (id: string, status: Order['status']) => {
        try {
            const orderRef = doc(db, 'orders', id);
            await updateDoc(orderRef, { status });
            setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
        } catch (e) { 
            console.error("Failed to update status", e);
            throw e;
        }
    };

    const deleteOrder = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'orders', id));
            setOrders(prev => prev.filter(o => o.id !== id));
        } catch (e) { 
            console.error("Failed to delete order", e);
            throw e;
        }
    };

    const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
        try {
            const newId = Date.now().toString(); 
            const postWithId = { ...post, id: newId };
            await setDoc(doc(db, 'blog', newId), postWithId);
            setBlogPosts(prev => [postWithId, ...prev]);
        } catch(e) { 
            console.error("Failed to add blog post", e);
            throw e;
        }
    };

    const deleteBlogPost = async (id: number | string) => {
        try {
            await deleteDoc(doc(db, 'blog', id.toString()));
            setBlogPosts(prev => prev.filter(b => b.id != id));
        } catch(e) { 
            console.error("Failed to delete blog post", e);
            throw e;
        }
    };

    const addGalleryImage = async (image: Omit<GalleryImage, 'id'>) => {
        try {
            const newId = Date.now().toString();
            const imgWithId = { ...image, id: newId };
            await setDoc(doc(db, 'gallery', newId), imgWithId);
            setGalleryImages(prev => [imgWithId, ...prev]);
        } catch(e) { 
            console.error("Failed to add gallery image", e);
            throw e;
        }
    };

    const deleteGalleryImage = async (id: number | string) => {
        try {
            await deleteDoc(doc(db, 'gallery', id.toString()));
            setGalleryImages(prev => prev.filter(i => i.id != id));
        } catch(e) { 
            console.error("Failed to delete gallery image", e);
            throw e;
        }
    };

    const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
        try {
            const newId = Date.now().toString();
            const tWithId = { ...testimonial, id: newId };
            await setDoc(doc(db, 'testimonials', newId), tWithId);
            setTestimonials(prev => [tWithId, ...prev]);
        } catch(e) { 
            console.error("Failed to add testimonial", e);
            throw e;
        }
    };

    const deleteTestimonial = async (id: number | string) => {
        try {
            await deleteDoc(doc(db, 'testimonials', id.toString()));
            setTestimonials(prev => prev.filter(t => t.id != id));
        } catch(e) { 
            console.error("Failed to delete testimonial", e);
            throw e;
        }
    };

    const addProductReview = async (productId: string, review: Review) => {
        try {
            const productRef = doc(db, 'products', productId);
            await updateDoc(productRef, {
                reviews: arrayUnion(review)
            });
            setProducts(prev => prev.map(p => {
                if (p.id === productId) {
                    return { ...p, reviews: [...p.reviews, review] };
                }
                return p;
            }));
        } catch (e) {
            console.error("Failed to add review", e);
            throw e; 
        }
    }

    const submitUserStory = async (submission: Omit<UserSubmission, 'id'>) => {
        try {
            await addDoc(collection(db, 'submissions'), {
                ...submission,
                status: 'pending'
            });
            if(isAdmin) fetchSubmissions();
        } catch (e) {
            console.error("Failed to submit story", e);
            throw e;
        }
    }

    const approveSubmission = async (submission: UserSubmission) => {
        try {
            if (submission.type === 'testimonial') {
                await addTestimonial({
                    name: submission.customerName,
                    location: submission.location || 'Happy Customer',
                    quote: submission.content,
                    imageUrl: submission.imageUrl || 'https://via.placeholder.com/150'
                });
            } else {
                await addGalleryImage({
                    beforeUrl: 'https://via.placeholder.com/150?text=Before',
                    afterUrl: submission.imageUrl || 'https://via.placeholder.com/150',
                    description: submission.content
                });
            }
            await deleteDoc(doc(db, 'submissions', submission.id));
            setSubmissions(prev => prev.filter(s => s.id !== submission.id));
        } catch(e) { 
            console.error("Failed to approve", e);
            throw e;
        }
    }

    const deleteSubmission = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'submissions', id));
            setSubmissions(prev => prev.filter(s => s.id !== id));
        } catch(e) { 
            console.error("Failed to delete submission", e);
            throw e;
        }
    }

    return (
        <DataContext.Provider value={{
            products,
            blogPosts,
            orders,
            galleryImages,
            testimonials,
            submissions,
            addProduct,
            updateProduct,
            deleteProduct,
            addOrder,
            updateOrderStatus,
            deleteOrder,
            addBlogPost,
            deleteBlogPost,
            addGalleryImage,
            deleteGalleryImage,
            addTestimonial,
            deleteTestimonial,
            addProductReview,
            submitUserStory,
            approveSubmission,
            deleteSubmission,
            refreshData: fetchData
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};