
import React, { createContext, useContext, useState, useEffect} from 'react';
import type { ReactNode } from 'react';
import type { Product, BlogPost, Order } from '../types';
import { PRODUCTS, BLOG_POSTS } from '../constants';
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
    increment
} from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface DataContextType {
    products: Product[];
    blogPosts: BlogPost[];
    orders: Order[];
    addProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
    addOrder: (order: Order) => void;
    updateOrderStatus: (id: string, status: Order['status']) => void;
    deleteOrder: (id: string) => void;
    addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
    deleteBlogPost: (id: number | string) => Promise<void>;
    refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const { isAuthenticated, user, isAdmin, updateUserPoints } = useAuth();

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
                    // Using ID from constants as document ID
                    await setDoc(doc(db, 'blog', post.id.toString()), post);
                }
                setBlogPosts(BLOG_POSTS);
            } catch (error) {
                console.error("Error seeding blog:", error);
            }
        }
    }

    const fetchData = async () => {
        try {
            // Fetch Products
            const productsSnapshot = await getDocs(collection(db, 'products'));
            const productsList = productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));
            
            if (productsList.length === 0) {
                await seedDatabaseIfEmpty(productsList);
            } else {
                setProducts(productsList);
            }

            // Fetch Blog Posts
            const blogSnapshot = await getDocs(collection(db, 'blog'));
            // Cast strictly to ensure type compatibility
            const blogList = blogSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as BlogPost));
            
            if (blogList.length === 0) {
                await seedBlogIfEmpty(blogList);
            } else {
                setBlogPosts(blogList);
            }
            
        } catch (error: any) {
            if (error?.code === 'permission-denied') {
                console.warn("Firestore permissions denied. Falling back to local demo data.");
            } else {
                console.error("Error fetching data:", error);
            }
            setProducts(PRODUCTS); 
            setBlogPosts(BLOG_POSTS);
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

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [isAuthenticated, isAdmin, user]);

    // Actions
    const addProduct = async (product: Product) => {
        try {
            if (product.id) {
                await setDoc(doc(db, 'products', product.id), product);
            } else {
                await addDoc(collection(db, 'products'), product);
            }
            fetchData();
        } catch (e) { console.error("Failed to add product", e); }
    };

    const updateProduct = async (updatedProduct: Product) => {
        try {
            const productRef = doc(db, 'products', updatedProduct.id);
            await updateDoc(productRef, updatedProduct as any);
            setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        } catch (e) { console.error("Failed to update product", e); }
    };

    const deleteProduct = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'products', id));
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (e) { console.error("Failed to delete product", e); }
    };

     const addOrder = async (order: Order) => {
        try {
            await setDoc(doc(db, 'orders', order.id), order);
            setOrders(prev => [order, ...prev]);

            // LOYALTY LOGIC:
            if (order.userId) {
                // 1. Calculate points earned from the total amount paid
                // 1 point for every ₦100 spent
                const pointsEarned = Math.floor(order.total / 100);
                
                // 2. Get points used (if any)
                const pointsRedeemed = order.pointsRedeemed || 0;

                // 3. Net change to user's balance
                // We add earned points and subtract redeemed points
                const netPointsChange = pointsEarned - pointsRedeemed;

                const userRef = doc(db, 'users', order.userId);
                
                // Update Firestore
                await updateDoc(userRef, {
                    loyaltyPoints: increment(netPointsChange)
                });

                // Update Local Auth State to reflect changes immediately in UI
                if (user && user.id === order.userId) {
                    updateUserPoints((user.loyaltyPoints || 0) + netPointsChange);
                }
            }

        } catch (e) { console.error("Failed to place order", e); }
    };

    const updateOrderStatus = async (id: string, status: Order['status']) => {
        try {
            const orderRef = doc(db, 'orders', id);
            await updateDoc(orderRef, { status });
            setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
        } catch (e) { console.error("Failed to update status", e); }
    };

    const deleteOrder = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'orders', id));
            setOrders(prev => prev.filter(o => o.id !== id));
        } catch (e) { console.error("Failed to delete order", e); }
    };

    const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
        try {
            const newId = Date.now().toString(); 
            const postWithId = { ...post, id: newId };
            await setDoc(doc(db, 'blog', newId), postWithId);
            setBlogPosts(prev => [postWithId, ...prev]);
        } catch(e) { console.error("Failed to add blog post", e); }
    };

    const deleteBlogPost = async (id: number | string) => {
        try {
            await deleteDoc(doc(db, 'blog', id.toString()));
            setBlogPosts(prev => prev.filter(b => b.id != id));
        } catch(e) { console.error("Failed to delete blog post", e); }
    };

    return (
        <DataContext.Provider value={{
            products,
            blogPosts,
            orders,
            addProduct,
            updateProduct,
            deleteProduct,
            addOrder,
            updateOrderStatus,
            deleteOrder,
            addBlogPost,
            deleteBlogPost,
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
