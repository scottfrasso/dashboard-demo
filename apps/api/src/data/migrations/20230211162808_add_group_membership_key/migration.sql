/*
  Warnings:

  - A unique constraint covering the columns `[groupId,userId]` on the table `GroupMembership` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GroupMembership_groupId_userId_key" ON "GroupMembership"("groupId", "userId");
