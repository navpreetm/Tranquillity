"use client";

import AuthLayout from "../global-components/AuthLayout";
import RegisterForm from "./form";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseApp";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {

  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;

    if (user) {
      router.push("/dashboard");
    }
  }, [user, loading]);


  return (
    <AuthLayout variant="register">
      <RegisterForm />
    </AuthLayout>
  );
}
