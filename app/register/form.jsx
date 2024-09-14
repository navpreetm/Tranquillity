"use client";

import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseApp";
import { FaGoogle } from "react-icons/fa";

export default function RegisterForm() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <>
      <button onClick={() => {signInWithGoogle()}} className="w-full p-3 mb-4 flex items-center justify-center border border-gray-300 rounded-lg text-app-black">
        <FaGoogle /> &nbsp; Continue with Google
      </button>
    </>
  );
}