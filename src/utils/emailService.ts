import emailjs from '@emailjs/browser';
import type { Order } from '../types';

const SERVICE_ID = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

// Helper to check if keys exist
const checkKeys = () => {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.warn("EmailJS keys are missing in .env file. Emails will not be sent.");
        return false;
    }
    return true;
};

// 1. Order Confirmation
export const sendOrderConfirmationEmail = async (order: Order) => {
    if (!checkKeys()) return;

    const itemsList = order.items
        .map(item => `- ${item.name} (${item.size}) x${item.quantity}`)
        .join('\n');

    const templateParams = {
        to_name: order.customerName,
        to_email: order.customerEmail,
        subject: `Order Confirmation #${order.id}`,
        order_id: order.id,
        total: `₦${order.total.toLocaleString()}`,
        message: `Thank you for your order! We have received your request and are processing it.\n\nItems Ordered:\n${itemsList}\n\nShipping Address:\n${order.shippingAddress}`
    };

    try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log("Order confirmation email sent.");
    } catch (error) {
        console.error("Failed to send order confirmation:", error);
    }
};

// 2. Payment Received
export const sendPaymentReceivedEmail = async (order: Order, transactionRef: string) => {
    if (!checkKeys()) return;

    const templateParams = {
        to_name: order.customerName,
        to_email: order.customerEmail,
        subject: `Payment Receipt: Order #${order.id}`,
        order_id: order.id,
        total: `₦${order.total.toLocaleString()}`,
        message: `We have successfully received your payment via Monnify.\n\nTransaction Reference: ${transactionRef}\nDate: ${new Date().toLocaleString()}\n\nYour order is now being prepared for shipping.`
    };

    try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log("Payment receipt email sent.");
    } catch (error) {
        console.error("Failed to send payment receipt:", error);
    }
};

// 3. Order Shipped
export const sendOrderShippedEmail = async (order: Order) => {
    if (!checkKeys()) return;

    const templateParams = {
        to_name: order.customerName,
        to_email: order.customerEmail,
        subject: `Your Order #${order.id} is on its way!`,
        order_id: order.id,
        total: `₦${order.total.toLocaleString()}`,
        message: `Great news! Your order has been dispatched.\n\nPlease ensure someone is available at the shipping address:\n${order.shippingAddress}\n\nStandard delivery is 3-5 business days.`
    };

    try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log("Shipping email sent.");
    } catch (error) {
        console.error("Failed to send shipping email:", error);
    }
};

// 4. Order Delivered
export const sendOrderDeliveredEmail = async (order: Order) => {
    if (!checkKeys()) return;

    const templateParams = {
        to_name: order.customerName,
        to_email: order.customerEmail,
        subject: `Delivered: Order #${order.id}`,
        order_id: order.id,
        total: `₦${order.total.toLocaleString()}`,
        message: `Your package has been marked as DELIVERED.\n\nWe hope you enjoy your natural products! If you love them, please consider leaving a review on our website.\n\nIf you have not received your package yet, please reply to this email immediately.`
    };

    try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log("Delivery email sent.");
    } catch (error) {
        console.error("Failed to send delivery email:", error);
    }
};