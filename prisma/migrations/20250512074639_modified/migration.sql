/*
  Warnings:

  - Added the required column `updatedAt` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
