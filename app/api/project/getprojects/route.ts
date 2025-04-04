import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { prisma } from "@/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return Response.json({ message: "Log in first!" });
  }

  const userID = session.user.id;

  if (userID) {
    const response = await prisma.project.findMany({
      where: {
        createdBy: userID,
      },
    });

    if (response) {
      return Response.json(response);
    }
  }
  return Response.json({ message: "Failed" });
}
