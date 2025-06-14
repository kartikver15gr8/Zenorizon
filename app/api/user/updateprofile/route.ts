import { NextRequest } from "next/server";
import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  const { username, fullname } = await request.json();

  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return new Response(JSON.stringify({ message: "Kindly log in!" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const updatedProfile = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: fullname,
        username: username,
      },
    });

    if (updatedProfile) {
      return new Response(JSON.stringify({ message: "User info updated!" }));
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error updating user info!" })
    );
  }
}
