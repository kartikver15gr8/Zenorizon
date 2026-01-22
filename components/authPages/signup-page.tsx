"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { signIn, useSession } from "@/utils/auth";
import { useRouter } from "next/navigation";
import AuthButton from "./auth-button";
import { useLocalStorage } from "@/hooks/use-local-storage";

type Provider = "google" | "github";

export default function SignupPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [lastLoginPreference, setLastLoginPreference] =
    useLocalStorage<Provider | null>("lastUsedLoginPreference", null);


  useEffect(() => {
    if (session?.user?.email) {
      router.push("/");
    }
  }, [session?.user?.email, router]);

  const signUp = async (provider: Provider) => {
    try {
      setLastLoginPreference(provider); 
      await signIn(provider);
    } catch (err) {
      console.error(`Sign in failed for ${provider}`, err);
      setLastLoginPreference(null);
    }
  };

  return (
    <div className="grid grid-cols-1 items-center justify-center pt-[70px] min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 shadow-[inset_-270px_-250px_160px_rgba(190,210,211,0.03)]">
      <div className="h-full rounded-2xl flex items-center justify-center">
        <div className="w-80 rounded flex flex-col items-center justify-center">
          <Image
            className="border border-white p-1 h-20 w-20 rounded-3xl mb-10"
            src="appIconTwo.svg"
            alt="Logo"
            width={100}
            height={100}
          />

          <div className="grid grid-cols-1 gap-y-2 w-full">
            <AuthButton
              btnTitle="Continue with Google"
              working={false}
              lastUsed={lastLoginPreference === "google"}
              handleOnClickFunction={() => signUp("google")}
            />
            <AuthButton
              btnTitle="Continue with GitHub"
              working={true}
              lastUsed={lastLoginPreference === "github"}
              handleOnClickFunction={() => signUp("github")}
            />
            <AuthButton btnTitle="Continue with SAML SSO" working={false} />
          </div>

          <div className="text-sm mt-5 w-[80%] flex items-center flex-col">
            <p className="text-[#838384]">By signing up, you agree to our</p>
            <Link href="/terms">terms and conditions.</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
