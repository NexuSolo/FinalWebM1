/*
  Warnings:

  - You are about to drop the column `userId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `userId2` on the `Conversation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_userId2_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_userId_fkey";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "userId",
DROP COLUMN "userId2";

-- CreateTable
CREATE TABLE "_UserConversation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserConversation_AB_unique" ON "_UserConversation"("A", "B");

-- CreateIndex
CREATE INDEX "_UserConversation_B_index" ON "_UserConversation"("B");

-- AddForeignKey
ALTER TABLE "_UserConversation" ADD CONSTRAINT "_UserConversation_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserConversation" ADD CONSTRAINT "_UserConversation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
