import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user.email) {
    return Response.json({ message: "Kindly log in to access this page!" });
  }

  const userID = session.user.id;

  if (userID) {
    const userDetails = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    return Response.json(userDetails);
  }

  return Response.json({ message: "Error while fetching user details." });
}
