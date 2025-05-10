import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { prisma } from "@/db";

export async function POST(request: NextRequest) {
  const {
    issueTitle,
    issueDescription,
    issueStatus,
    issuePriority,
    projectId,
  } = await request.json();

  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return Response.json({ message: "Kindly log in!" });
  }

  if (session.user.id) {
    const response = await prisma.issue.create({
      data: {
        title: issueTitle,
        description: issueDescription,
        status: issueStatus,
        priority: issuePriority,
        projectId: projectId,
      },
    });
    if (response) {
      return Response.json({
        message: "New issue created!",
      });
    }
  }
  return Response.json({ message: "Error occured!" });
}
