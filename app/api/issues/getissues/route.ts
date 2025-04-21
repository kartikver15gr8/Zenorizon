import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { prisma } from "@/db";

export async function POST(request: NextRequest) {
  const { project_id } = await request.json();

  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return new Response(JSON.stringify({ message: "Kindly Sign in!" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (project_id) {
    const issues = await prisma.issue.findMany({
      where: {
        projectId: project_id,
      },
    });
    if (issues) {
      return new Response(JSON.stringify(issues), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
  return new Response(
    JSON.stringify({
      message: "Failed to fetch issues with the project id.",
    }),
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
