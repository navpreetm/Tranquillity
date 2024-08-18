"use client";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { app } from "../../firebase/firebaseApp";

export default function RegisterForm() {
  return (
    <div className="grid gap-4">
      <button className="text-app-black">Sign in with google!</button>
    </div>
  );
}