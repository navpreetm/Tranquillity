"use client";

import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function PrivateLayout({ children }) {
  const { user } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("checking protected route");
    
    console.log(user)
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  return user ? <>{children}</> : <></>;
}