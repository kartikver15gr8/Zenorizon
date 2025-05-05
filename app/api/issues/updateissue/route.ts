import { NextRequest } from "next/server";
import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  const { issueId, issueTitle, issueDescription, issuePriority, issueStatus } =
    await request.json();

  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return new Response(JSON.stringify({ message: "Kindly log in!" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: issueId },
      data: {
        title: issueTitle,
        description: issueDescription,
        priority: issuePriority,
        status: issueStatus,
      },
    });

    if (updatedIssue) {
      return new Response(JSON.stringify({ message: "Issue updated!" }));
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error updating issue!" }));
  }
}
