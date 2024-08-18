"use client";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { app } from "../../firebase/firebaseApp";

export default function LoginForm() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/app");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name@email.com"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          readOnly
        />
        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          readOnly
        />
        <button className="w-full p-3 mb-4 flex items-center justify-center border border-gray-300 rounded-lg text-app-black">
          [ICON] Continue with Email
        </button>
      </form>

      <div className="flex items-center mb-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      
      <button className="w-full p-3 mb-4 flex items-center justify-center border border-gray-300 rounded-lg text-app-black">
        [ICON] Continue with Google
      </button>
    </>
  );
}