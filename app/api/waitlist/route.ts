// import { NextRequest } from "next/server";
// import { prisma } from "@/db";

// export async function POST(request: NextRequest) {
//   const { userEmail } = await request.json();

//   const emailExists = await prisma.waitListEmails.findFirst({
//     where: { email: userEmail },
//   });

//   if (emailExists) {
//     return Response.json({ message: "Email already exists in the waitlist!" });
//   } else {
//     const response = await prisma.waitListEmails.create({
//       data: {
//         email: userEmail,
//       },
//     });
//     if (response) {
//       return Response.json({
//         message: "Hurrahh🎉 you're added to the waitlist!",
//       });
//     }
//   }

//   return Response.json({ message: "Error occured!" });
// }

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { WaitlistEmail } from "@/components/waitlist/waitlist-email";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { userEmail } = await request.json();

    if (!userEmail || typeof userEmail !== "string") {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // TODO: Save email to your database/storage

    // Send confirmation email using Resend
    const { data, error } = await resend.emails.send({
      from: "Waitlist <onboarding@zenorizon.com>", 
      to: userEmail,
      subject: "Welcome to Our Waitlist! ✨",
      react: React.createElement(WaitlistEmail, { userEmail }),
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { message: "Added to waitlist, but failed to send confirmation email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Added to waitlist! Check your email for confirmation.",
        emailId: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { message: "Failed to process your request" },
      { status: 500 }
    );
  }
}
