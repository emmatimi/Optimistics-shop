import emailjs from '@emailjs/browser';
import type { Order } from '../types';

const SERVICE_ID = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
const ORDER_TEMPLATE_ID = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID;
const GENERAL_TEMPLATE_ID = (import.meta as any).env.VITE_EMAILJS_GENERAL_TEMPLATE_ID;
const PUBLIC_KEY = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

// Helper to check keys
const checkKeys = (type: 'order' | 'general' = 'order') => {
    if (!SERVICE_ID || !PUBLIC_KEY) {
        console.warn("EmailJS Service ID or Public Key missing.");
        return false;
    }
    if (type === 'order' && !ORDER_TEMPLATE_ID) {
        console.warn("Order Template ID missing.");
        return false;
    }
    if (type === 'general' && !GENERAL_TEMPLATE_ID) {
        console.warn("General Template ID missing. Using Order template fallback.");
        return true; 
    }
    return true;
};

// --- ORDER EMAILS ---

export const sendOrderConfirmationEmail = async (order: Order) => {
    if (!checkKeys('order')) return;

    const templateParams = {
        to_name: order.customerName,
        to_email: order.customerEmail,
        subject: `Order Confirmation #${order.id}`,
        order_id: order.id,
        total: `₦${order.total.toLocaleString()}`,
        message: `We have received your order request!
        
        Customer Info:
        Name: ${order.customerName}
        Phone: ${order.customerPhone}
        
        Your order details:
        ${order.items.map(item => `- ${item.name} (Size: ${item.size}, Qty: ${item.quantity})`).join('\n')}
        
        Shipping Address:
        ${order.shippingAddress}
        
        We will process your items shortly.`
    };

    try {
        await emailjs.send(SERVICE_ID, ORDER_TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log("Order confirmation email sent.");
    } catch (error) {
        console.error("Failed to send order confirmation:", error);
    }
};

export const sendPaymentReceivedEmail = async (order: Order, transactionReference: string) => {
    if (!checkKeys('order')) return;

    const templateParams = {
        to_name: order.customerName,
        to_email: order.customerEmail,
        subject: `Payment Receipt for Order #${order.id}`,
        order_id: order.id,
        total: `₦${order.total.toLocaleString()}`,
        message: `We have successfully received your payment.
        
        Payment Details:
        ----------------
        Amount Paid: ₦${order.total.toLocaleString()}
        Transaction Ref: ${transactionReference}
        Date: ${new Date().toLocaleString()}
        Payment Method: Monnify Secure Gateway
        
        Thank you for your business!`
    };

    try {
        await emailjs.send(SERVICE_ID, ORDER_TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log("Payment receipt email sent.");
    } catch (error) {
        console.error("Failed to send payment receipt:", error);
    }
};

export const sendOrderShippedEmail = async (order: Order) => {
    if (!checkKeys('order')) return;

    const templateParams = {
        to_name: order.customerName,
        to_email: order.customerEmail,
        subject: `Your Order #${order.id} is on its way!`,
        order_id: order.id,
        total: `₦${order.total.toLocaleString()}`,
        message: `Exciting news! Your order has been dispatched and is on its way to you.
        
        Please ensure someone is available at the shipping address:
        ${order.shippingAddress}
        (Phone: ${order.customerPhone})
        
        Delivery typically takes 3-5 business days depending on your location.`
    };

    try {
        await emailjs.send(SERVICE_ID, ORDER_TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log("Shipping notification email sent.");
    } catch (error) {
        console.error("Failed to send shipping email:", error);
    }
};

export const sendOrderDeliveredEmail = async (order: Order) => {
    if (!checkKeys('order')) return;

    const templateParams = {
        to_name: order.customerName,
        to_email: order.customerEmail,
        subject: `Delivered: Order #${order.id}`,
        order_id: order.id,
        total: `₦${order.total.toLocaleString()}`,
        message: `Your package has been marked as DELIVERED. 
        
        We hope you enjoy your natural products. If you love them, please consider leaving a review on our website!
        
        If you have not received your package yet, please reply to this email immediately.`
    };

    try {
        await emailjs.send(SERVICE_ID, ORDER_TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log("Delivery notification email sent.");
    } catch (error) {
        console.error("Failed to send delivery email:", error);
    }
};

// --- GENERAL EMAILS ---

export const sendSubscriptionEmail = async (email: string) => {
    const activeTemplateId = GENERAL_TEMPLATE_ID || ORDER_TEMPLATE_ID;
    if (!checkKeys('general') && !activeTemplateId) return;

    const templateParams = {
        to_name: "Natural Beauty Lover",
        to_email: email,
        subject: "Welcome to Optimistics Naturals!",
        message: `Thank you for joining our community!
        
        You are now on the list to receive exclusive offers, beauty tips, and new product alerts.
        
        🎁 As a welcome gift, use code **WELCOME10** for 10% off your first order!
        
        Start shopping now and discover your natural radiance.`
    };

    try {
        await emailjs.send(SERVICE_ID, activeTemplateId, templateParams, PUBLIC_KEY);
        console.log("Subscription email sent.");
    } catch (error) {
        console.error("Failed to send subscription email:", error);
    }
};

export const sendContactFormEmail = async (name: string, email: string, message: string) => {
    const activeTemplateId = GENERAL_TEMPLATE_ID || ORDER_TEMPLATE_ID;
    if (!checkKeys('general') && !activeTemplateId) return;

    const adminEmail = "support@optimistics.com"; 

    const templateParams = {
        to_name: "Admin",
        to_email: adminEmail, 
        subject: `New Inquiry from ${name}`,
        message: `You received a new message from the website contact form.
        
        Sender Name: ${name}
        Sender Email: ${email}
        
        Message:
        --------------------------------
        ${message}
        --------------------------------
        
        Please reply directly to ${email}`
    };

    try {
        await emailjs.send(SERVICE_ID, activeTemplateId, templateParams, PUBLIC_KEY);
        console.log("Contact email sent.");
    } catch (error) {
        console.error("Failed to send contact email:", error);
        throw error;
    }
};

export const sendWelcomeEmail = async (name: string, email: string) => {
    const activeTemplateId = GENERAL_TEMPLATE_ID || ORDER_TEMPLATE_ID;
    if (!checkKeys('general') && !activeTemplateId) return;

    const templateParams = {
        to_name: name,
        to_email: email,
        subject: "Welcome to the Optimistics Family!",
        message: `Hi ${name},
        
        Welcome to Optimistics Naturals! We are thrilled to have you join our community of natural beauty lovers.
        
        You can now log in to view your order history, save your favorite items to your wishlist, and earn rewards points on every purchase.
        
        As a thank you for signing up, we've credited 200 Loyalty Points to your account!
        
        Happy Shopping!`
    };

    try {
        await emailjs.send(SERVICE_ID, activeTemplateId, templateParams, PUBLIC_KEY);
        console.log("Welcome email sent.");
    } catch (error) {
        console.error("Failed to send welcome email:", error);
    }
};