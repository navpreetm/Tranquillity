"use client";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { app } from "../../firebase/firebaseApp";

export default function RegisterForm() {
  return (
    <>
      <button className="w-full p-3 mb-4 flex items-center justify-center border border-gray-300 rounded-lg text-app-black">
        [ICON] Continue with Google
      </button>
    </>
  );
}