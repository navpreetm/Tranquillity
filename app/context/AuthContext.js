"use client";

import { useContext, createContext, useState, useEffect } from 'react';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { auth, app } from '../../firebase/firebaseApp';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // sign in with google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  // Function to handle email/password sign-in
  const signInWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with email: ", error);
    }
  };

  // Function to handle email/password sign-up
  const signUpWithEmail = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing up with email: ", error);
    }
  };

  // Function to handle sign out
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };


  // Monitor changes user state and set user in state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      console.log(user);

      // if user is defined, create a Firestore user document if needed
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = getDoc(userDocRef);
        
        if (!userDoc.exists) {
          await setDoc(userDocRef, {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: new Date(),
            premium: false,
            dailyAnalysisCount: 0,
            aiTokenUsage: 0,
            streak: 0
          })
        }
      }
    });
    return () => unsubscribe();
  }, []);


  return (
    <AuthContext.Provider value={{ 
      user, signInWithGoogle, signInWithEmail, signUpWithEmail, logOut 
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
}
