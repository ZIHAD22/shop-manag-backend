/*
  Warnings:

  - You are about to drop the column `performerEmail` on the `History` table. All the data in the column will be lost.
  - Added the required column `performerId` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_performerEmail_fkey";

-- AlterTable
ALTER TABLE "History" DROP COLUMN "performerEmail",
ADD COLUMN     "performerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_performerId_fkey" FOREIGN KEY ("performerId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
