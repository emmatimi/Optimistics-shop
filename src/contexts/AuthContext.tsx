import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { auth, db } from '../firebase';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc} from 'firebase/firestore';
import { sendWelcomeEmail } from '../utils/emailService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  updateUserPoints: (newPoints: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
            // Fetch user details (like role) from Firestore
            try {
                const userDocRef = doc(db, 'users', firebaseUser.uid);
                const userDoc = await getDoc(userDocRef);
                
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUser({
                        id: firebaseUser.uid,
                        email: firebaseUser.email || '',
                        name: userData.name || firebaseUser.displayName || 'User',
                        role: userData.role || 'customer',
                        loyaltyPoints: userData.loyaltyPoints || 0
                    });
                } else {
                    // Fallback if doc doesn't exist yet
                    setUser({
                        id: firebaseUser.uid,
                        email: firebaseUser.email || '',
                        name: firebaseUser.displayName || 'User',
                        role: 'customer',
                        loyaltyPoints: 0
                    });
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        } else {
            setUser(null);
        }
        setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateUserPoints = (newPoints: number) => {
      if (user) {
          setUser({ ...user, loyaltyPoints: newPoints });
      }
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        return true;
    } catch (error) {
        console.error("Login failed:", error);
        return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const firebaseUser = result.user;

        // Check if user exists in Firestore, if not, create them
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            const name = firebaseUser.displayName || 'Google User';
            const email = firebaseUser.email;

            await setDoc(userDocRef, {
                name: name,
                email: email,
                role: 'customer',
                loyaltyPoints: 200 // Bonus for Google Sign up
            });

            // Send Welcome Email if email exists
            if (email) {
                await sendWelcomeEmail(name, email);
            }
        }
        return true;
    } catch (error) {
        console.error("Google Login failed:", error);
        return false;
    }
  };

  const register = async (name: string, email: string, pass: string): Promise<boolean> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        const firebaseUser = userCredential.user;

        // Create user document in Firestore with 200 bonus points
        await setDoc(doc(db, 'users', firebaseUser.uid), {
            name,
            email,
            role: 'customer',
            loyaltyPoints: 200
        });

        // Send Welcome Email
        await sendWelcomeEmail(name, email);

        return true;
    } catch (error) {
        console.error("Registration failed:", error);
        return false;
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
      try {
          await sendPasswordResetEmail(auth, email);
          return true;
      } catch (error) {
          console.error("Reset password failed:", error);
          return false;
      }
  };

  const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout failed:", error);
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, loginWithGoogle, logout, register, resetPassword, updateUserPoints }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};