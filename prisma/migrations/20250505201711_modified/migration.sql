/*
  Warnings:

  - You are about to drop the column `workspaceId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Workspace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_WorkspaceMembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "_WorkspaceMembers" DROP CONSTRAINT "_WorkspaceMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "_WorkspaceMembers" DROP CONSTRAINT "_WorkspaceMembers_B_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "workspaceId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "workspaceId";

-- DropTable
DROP TABLE "Workspace";

-- DropTable
DROP TABLE "_WorkspaceMembers";
