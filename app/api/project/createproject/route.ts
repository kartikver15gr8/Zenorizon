import { NextRequest } from "next/server";
import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { projTitle, projDescription, projContent } = await request.json();

  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return Response.json({ message: "Kindly log in!" });
  }

  if (session?.user.id) {
    const response = await prisma.project.create({
      data: {
        title: projTitle,
        description: projDescription,
        createdBy: session.user.id,
        content: projContent,
      },
    });
    if (response) {
      return Response.json({
        message: "New project created!",
      });
    }
  }
  return Response.json({ message: "Error occured!" });
}
