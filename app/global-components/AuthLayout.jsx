import Link from "next/link";
import { Suspense } from "react";

export default function AuthLayout({
  variant,
  children,
}) {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-5">

      {/* left half */}
      <div className="col-span-1 flex min-h-screen flex-col items-center justify-between border-r border-gray-200 bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur sm:col-span-3">
        <div className="flex h-full w-full flex-col items-center justify-center">
          {/* Use ClientOnly because the login form relies on local storage for its initial render */}
          <div className="relative flex w-full flex-col items-center justify-center">
            <div className="w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-sm">
              <div className="border-b border-gray-200 bg-white pb-6 pt-8 text-center">
                <h3 className="text-lg text-app-black font-semibold">
                  {variant === "login"
                    ? "Sign in to your TranQuillity account"
                    : "Get started with TranQuillity"}
                </h3>
              </div>
              <div className="grid gap-3 bg-gray-50 px-4 py-8 sm:px-16">
                <Suspense>{children}</Suspense>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-app-black">
              {variant === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <Link
                href={`/${variant === "login" ? "register" : "login"}`}
                className="font-semibold text-app-black underline underline-offset-2 transition-colors hover:text-black"
              >
                {variant === "login" ? "Sign up" : "Sign in"}
              </Link>
            </p>
          </div>
        </div>
        <div className="grid gap-2 pb-8 pt-4">
          <p className="text-xs text-app-black">
            © {new Date().getFullYear()} TranQuillity.dev
          </p>
          <div className="flex gap-3 text-center text-xs text-app-black underline underline-offset-2">
            <a
              href="https://dub.co/privacy"
              target="_blank"
              className="hover:text-gray-800"
            >
              Privacy Policy
            </a>
            <a
              href="https://dub.co/terms"
              target="_blank"
              className="hover:text-gray-800"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* right half */}
      <div className="hidden h-full flex-col justify-center space-y-12 overflow-hidden md:col-span-2 md:flex">
      </div>
    </div>
  )
}