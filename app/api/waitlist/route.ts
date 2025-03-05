import { NextRequest } from "next/server";
import { prisma } from "@/db";

export async function POST(request: NextRequest) {
  const { userEmail } = await request.json();

  const emailExists = await prisma.waitListEmails.findFirst({
    where: { email: userEmail },
  });

  if (emailExists) {
    return Response.json({ message: "Email already exists in the waitlist!" });
  } else {
    const response = await prisma.waitListEmails.create({
      data: {
        email: userEmail,
      },
    });
    if (response) {
      return Response.json({
        message: "Hurrahh🎉 you're added to the waitlist!",
      });
    }
  }

  return Response.json({ message: "Error occured!" });
}
