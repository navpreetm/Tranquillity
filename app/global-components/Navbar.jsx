"use client";

import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

export function MainNav() {
  // logo on top left, login / signup / account on top right
  const { user } = UserAuth();
  console.log(user)

  return (
    <div className="py-4 px-10">
      <Link href="/"className="animate-fade-in rounded-full px-4 py-1.5 text-xl font-medium transition-colors ease-out text-app-black hover:text-black">
        LOGO HERE
      </Link>
      
      <div className="float-right">
        <Link href="/login"
          className="animate-fade-in rounded-full px-4 py-1.5 text-md font-medium text-app-black transition-colors ease-out hover:text-black">
          Log in
        </Link>
        <Link href="/register"
          className="animate-fade-in rounded-full border border-black bg-black px-4 py-1.5 text-md text-white transition-all hover:bg-gray-800 hover:ring-4 hover:ring-app-dark-purple">
          Sign up
        </Link>
      </div>
    </div>
  )
}