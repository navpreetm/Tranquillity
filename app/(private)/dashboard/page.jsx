"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseApp";
import Link from "next/link";

export default function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  console.log("fetching dashboard");

  // need to perform a fetch for:
  // total streak data
  // date list of streaks

  // Gets the first name using the firebase display name
  const getFirstName = (name) => {
    return name.split(" ")[0];
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl"> Hello {getFirstName(user.displayName)}!</h1>
      <p className="text-xl">
        Your daily streak is <span className="text-app-purple-700">11</span>
      </p>

      <h2 className="text-2xl mt-12">Today&apos;s Tasks</h2>
      <ul className="list-none mt-4">
        <li className="text-xl">
          <i className="fas fa-square"></i> write a{" "}
          <Link href="/journal-entries" className="text-purple-600 underline">
            journal entry
          </Link>
        </li>
        <li className="text-xl mt-2">
          <i className="fas fa-square"></i> complete{" "}
          <Link href="/mood-tracker" className="text-purple-600 underline">
            mood tracker
          </Link>
        </li>
      </ul>
    </div>
  );
}
