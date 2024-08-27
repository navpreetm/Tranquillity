"use client";

import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseApp";

export function MainNav() {
  // logo on top left, login / signup / account on top right
  const [user, loading, error] = useAuthState(auth);

  const renderLoginButtons = () => {
    return (
      <>
        <Link href="/login"
          className="animate-fade-in rounded-full px-4 py-1.5 text-md font-medium text-app-black transition-colors ease-out hover:text-black">
          Log in
        </Link>
        <Link href="/register"
          className="animate-fade-in rounded-full border border-black bg-black px-4 py-1.5 text-md text-white transition-all hover:bg-gray-800 hover:ring-4 hover:ring-app-purple-200">
          Sign up
        </Link>
      </>
    )
  }

  return (
    <div className="py-4 px-10 border-b-2 border-app-purple-700">
      <Link href="/" className="animate-fade-in rounded-full px-4 py-1.5 text-xl font-medium transition-colors ease-out text-app-black hover:text-black">
        LOGO HERE
      </Link>

      <div className="float-right">
        {user ? (
          <Link href="/dashboard"
            className="animate-fade-in rounded-full px-4 py-1.5 text-md font-medium text-app-black transition-colors ease-out hover:text-black">
            Go To Dashboard
          </Link>
        ) : renderLoginButtons()}
      </div>
    </div>
  )
}