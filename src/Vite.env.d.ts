/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FIREBASE_API_KEY: string
    readonly VITE_FIREBASE_AUTH_DOMAIN: string
    readonly VITE_FIREBASE_PROJECT_ID: string
    readonly VITE_FIREBASE_STORAGE_BUCKET: string
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
    readonly VITE_FIREBASE_APP_ID: string
    readonly VITE_MONNIFY_API_KEY: string
    readonly VITE_MONNIFY_CONTRACT_CODE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module 'react-monnify' {
    export interface MonnifyConfig {
        amount: number;
        currency: string;
        reference: string;
        customerName: string;
        customerEmail: string;
        apiKey: string;
        contractCode: string;
        paymentDescription: string;
        isTestMode?: boolean;
        metadata?: object;
    }

    export interface MonnifyProps {
        config: MonnifyConfig;
        onSuccess: (response: any) => void;
        onClose: () => void;
        children: React.ReactNode;
        className?: string;
    }

    export const MonnifyButton: React.FC<MonnifyProps>;
    // Updated signature to accept success and close callbacks
    export const usePayWithMonnifyPayment: (config: MonnifyConfig) => { 
        initializePayment: (onSuccess?: (response: any) => void, onClose?: () => void) => void 
    };
}