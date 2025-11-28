import React, { createContext, useContext, useState, useEffect, useCallback} from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product } from '../types';
import { useNotification } from './NotificationContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showNotification } = useNotification();
  
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const localData = localStorage.getItem('optimistics_cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart data from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('optimistics_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product: Product, quantity = 1, size?: string) => {
    const selectedSize = size || product.size;
    const cartId = `${product.id}-${selectedSize}`;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === cartId);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === cartId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      
      const price = (product.sizes && product.sizes[selectedSize]) ? product.sizes[selectedSize] : product.price;
      
      const newItem: CartItem = {
          ...product,
          id: cartId,
          productId: product.id,
          size: selectedSize,
          price: price,
          quantity: quantity
      };

      return [...prevItems, newItem];
    });

    showNotification(`${product.name} added to cart!`, 'success');

  }, [showNotification]);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    showNotification("Item removed from cart", "info");
  }, [showNotification]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};