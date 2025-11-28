
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
    id: number;
    name: string;
    location: string;
    quote: string;
    imageUrl: string;
}

export interface GalleryImage {
    id: number;
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
    date: string;
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    items: CartItem[];
    shippingAddress: string;
    pointsRedeemed?: number;
    discountApplied?: number;
}
