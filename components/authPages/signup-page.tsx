"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { signIn, useSession } from "@/utils/auth";
import { useRouter } from "next/navigation";
import AuthButton from "./auth-button";

export default function SignupPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user.email) {
      router.push("/");
    }
  }, [session?.user.email, router]);

  const signUpWithGitHub = async () => {
    try {
      await signIn("github");
    } catch (error) {
      console.log(`You got an error while signing up using GitHub: ${error}`);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log(`You got an error while signing up using GitHub: ${error}`);
    }
  };
  return (
    <div className="grid grid-cols-1 items-center justify-center pt-[70px] min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 shadow-[inset_-270px_-250px_160px_rgba(190,210,211,0.03)]">
      <div className="h-full rounded-2xl flex items-center justify-center">
        <div className=" w-80 rounded flex  flex-col items-center justify-center">
          <Image
            className="border border-white p-1 h-20 w-20 rounded-3xl mb-10"
            src="appIconTwo.svg"
            alt="Logo"
            width={100}
            height={100}
          />
          <div className="grid grid-cols-1 gap-y-2 w-full">
            <AuthButton btnTitle="Continue with Google" working={false} />
            <AuthButton
              btnTitle="Continue with GitHub"
              working={true}
              handleOnClickFunction={signUpWithGitHub}
            />
            <AuthButton btnTitle="Continue with SAML SSO" working={false} />
          </div>

          <div className="text-sm mt-5 w-[80%] flex items-center flex-col">
            <p className="text-[#838384]">By signing up, you agree to our</p>
            <Link href={"/terms-of-use"} className="">
              terms and conditions.
            </Link>
          </div>
          <div className="text-sm flex gap-x-1 mt-4">
            <p className="text-[#838384]">Already have an account?</p>
            <Link href={"/login"}>Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
