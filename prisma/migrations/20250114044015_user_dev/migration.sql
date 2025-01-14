/*
  Warnings:

  - You are about to drop the column `chatbot_api` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `knowledge_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "chatbot_api",
DROP COLUMN "knowledge_id",
ADD COLUMN     "apiKey" TEXT,
ADD COLUMN     "knowledgeBaseId" TEXT,
ADD COLUMN     "userId" TEXT;
