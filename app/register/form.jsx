"use client";

import { UserAuth } from "../context/AuthContext";

export default function RegisterForm() {
  const { signInWithGoogle } = UserAuth();

  const handleGoogleLogin = () => {
    signInWithGoogle();
  }

  return (
    <>
      <button onClick={handleGoogleLogin} className="w-full p-3 mb-4 flex items-center justify-center border border-gray-300 rounded-lg text-app-black">
        [ICON] Continue with Google
      </button>
    </>
  );
}