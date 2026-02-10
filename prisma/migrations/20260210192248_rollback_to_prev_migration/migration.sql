/*
  Warnings:

  - You are about to drop the column `performerId` on the `History` table. All the data in the column will be lost.
  - Added the required column `performerEmail` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_performerId_fkey";

-- AlterTable
ALTER TABLE "History" DROP COLUMN "performerId",
ADD COLUMN     "performerEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_performerEmail_fkey" FOREIGN KEY ("performerEmail") REFERENCES "Auth"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
