"use client";

import { useSignInWithGoogle } from "react-firebase-hooks/auth";

export default function RegisterForm() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <>
      <button onClick={() => signInWithGoogle} className="w-full p-3 mb-4 flex items-center justify-center border border-gray-300 rounded-lg text-app-black">
        [ICON] Continue with Google
      </button>
    </>
  );
}