export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  categories: ('Skincare' | 'Hair Growth')[];
  price: number;
  size: string;
  sizes?: { [size: string]: number };
  imageUrl: string;
  images: string[];
  description: string;
  ingredients: string[];
  benefits: string[];
  usage: string;
  reviews: Review[];
  isBestseller?: boolean;
  inStock?: boolean;
  tags: string[];
}

export interface BlogPost {
  id: number | string;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  date: string;
  content: string;
}

export interface Testimonial {
    id: number | string;
    name: string;
    location: string;
    quote: string;
    imageUrl: string;
}

export interface GalleryImage {
    id: number | string;
    beforeUrl: string;
    afterUrl: string;
    description: string;
}

export interface CartItem extends Product {
    quantity: number;
    productId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  loyaltyPoints: number;
}

export interface Order {
    id: string;
    userId?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    date: string;
    total: number;
    shippingFee: number; // New field
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    items: CartItem[];
    shippingAddress: string;
    pointsRedeemed?: number;
    discountApplied?: number;
}

export interface UserSubmission {
    id: string;
    type: 'testimonial' | 'result';
    customerName: string;
    email: string;
    content: string;
    imageUrl?: string;
    location?: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected';
}

// New: Shipping Configuration
export interface ShippingRate {
    state: string;
    fee: number;
}

export interface ShippingConfig {
    defaultFee: number;
    freeShippingThreshold: number; // Order total above this gets free shipping
    rates: ShippingRate[];
}