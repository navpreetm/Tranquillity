"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, app } from "@/firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Sidebar } from "@/global-components/Sidebar";

const db = getFirestore(app);

export default function PrivateLayout({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/login');
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("user unsubscribe triggered")

      if (!user) return;

      // if a user is logged in, make sure data is synced
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
    })

    return () => unsubscribe();
  }, [user, loading]);

  if (user) {
    return (
      <>
        <div className="flex" style={{ height: 'calc(100vh - 64px)' }}>
          <Sidebar />
          <div className="overflow-scroll w-full h-full">
            {children}
          </div>
        </div>
      </>
    )
  } else {
    return <></>;
  }
}