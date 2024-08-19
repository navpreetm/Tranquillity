"use client";

import { signInWithGoogle } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseApp";

export default function LoginForm() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  
  return (
    <>
      {/* <form onSubmit={handleSubmit}>
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
      </form> */}

      {/* <div className="flex items-center mb-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div> */}
      
      <button onClick={() => signInWithGoogle} className="w-full p-3 mb-4 flex items-center justify-center border border-gray-300 rounded-lg text-app-black">
        [ICON] Continue with Google
      </button>
    </>
  );
}