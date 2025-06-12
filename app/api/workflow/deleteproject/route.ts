import { NextRequest } from "next/server";
import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(request: NextRequest) {
  const { projectId } = await request.json();

  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return Response.json({ message: "Kindly log in!" }, { status: 401 });
  }

  try {
    await prisma.$transaction([
      prisma.issue.deleteMany({ where: { projectId } }),
      prisma.project.delete({ where: { id: projectId } }),
    ]);
    return Response.json(
      { message: "Project and related issues deleted!" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Error occurred!" }, { status: 500 });
  }
}
