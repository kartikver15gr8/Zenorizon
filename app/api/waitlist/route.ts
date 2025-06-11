import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Resend } from "resend";
import { prisma } from "@/db";
import { ratelimit } from "@/lib/rate-limit";
import { WaitlistEmail } from "@/components/waitlist/waitlist-email";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for") ||
      headersList.get("x-real-ip") ||
      "unknown";

    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

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

    // checking if email already exists
    const emailExists = await prisma.waitListEmails.findFirst({
      where: { email: userEmail },
    });

    if (emailExists) {
      return NextResponse.json(
        { message: "Email already exists in the waitlist!" },
        { status: 409 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Welcome to Zenorizon <onboarding@zenorizon.com>",
      to: userEmail,
      subject: "Welcome to Zenorizon! ✨",
      react: React.createElement(WaitlistEmail, { userEmail }),
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { message: "Failed to send confirmation email" },
        { status: 500 }
      );
    }

    const dbResponse = await prisma.waitListEmails.create({
      data: {
        email: userEmail.toLowerCase(),
      },
    });

    if (!dbResponse) {
      return NextResponse.json(
        { message: "Email sent, but failed to add to waitlist" },
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
