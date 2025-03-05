/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `WaitListEmails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WaitListEmails_email_key" ON "WaitListEmails"("email");
