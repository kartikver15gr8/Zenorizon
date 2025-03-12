"use client";

import { useSession, signIn, signOut } from "@/utils/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <div>
        <p>You are not signed in</p>
        <button onClick={() => signIn("github")}>Sign in</button>
      </div>
    );
  }

  return (
    <div>
      <p>Signed in as {session?.user?.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
