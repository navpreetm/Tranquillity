"use client";

import Link from "next/link";
import { UserAuth } from "../context/AuthContext";

export function MainNav() {
  // logo on top left, login / signup / account on top right
  const { user } = UserAuth();
  console.log(user)

  return (
    <div className="bg-app-light-purple bb-2 p-4">
      <Link href="/"className="animate-fade-in rounded-full px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black dark:text-white dark:hover:text-white/70">
        LOGO HERE
      </Link>
      
      <>
        <Link href="/login"
          className="animate-fade-in rounded-full px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black dark:text-white dark:hover:text-white/70">
          Login
        </Link>
        <Link href="/register"
          className="animate-fade-in rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-gray-800 hover:ring-4 hover:ring-gray-200 dark:border-white dark:bg-white dark:text-gray-600 dark:hover:bg-white dark:hover:text-gray-800 dark:hover:hover:shadow-[0_0_25px_5px_rgba(256,256,256,0.2)] dark:hover:ring-0">
          Signup
        </Link>
      </>
    </div>
  )
}