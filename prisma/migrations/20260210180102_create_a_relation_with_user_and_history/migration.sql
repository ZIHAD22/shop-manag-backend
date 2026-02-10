/*
  Warnings:

  - The values [SALE,RESTOCK] on the enum `InventoryActionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `performedBy` on the `History` table. All the data in the column will be lost.
  - Added the required column `performerEmail` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InventoryActionType_new" AS ENUM ('INIT', 'MANUAL_UPDATE', 'STOCK_IN', 'STOCK_OUT', 'ADJUSTMENT');
ALTER TABLE "History" ALTER COLUMN "actionType" TYPE "InventoryActionType_new" USING ("actionType"::text::"InventoryActionType_new");
ALTER TYPE "InventoryActionType" RENAME TO "InventoryActionType_old";
ALTER TYPE "InventoryActionType_new" RENAME TO "InventoryActionType";
DROP TYPE "public"."InventoryActionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "History" DROP COLUMN "performedBy",
ADD COLUMN     "performerEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_performerEmail_fkey" FOREIGN KEY ("performerEmail") REFERENCES "Auth"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
