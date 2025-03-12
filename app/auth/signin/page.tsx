"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-6">Sign In</h1>
      <button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="bg-black text-white px-4 py-2 rounded flex items-center space-x-2"
      >
        <span>Sign in with GitHub</span>
      </button>
    </div>
  );
}
