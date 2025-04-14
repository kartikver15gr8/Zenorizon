/*
  Warnings:

  - You are about to drop the column `assign` on the `Issue` table. All the data in the column will be lost.
  - Made the column `projectId` on table `Issue` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_projectId_fkey";

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "assign",
ADD COLUMN     "assignedUser" TEXT,
ALTER COLUMN "projectId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assignedUser_fkey" FOREIGN KEY ("assignedUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
