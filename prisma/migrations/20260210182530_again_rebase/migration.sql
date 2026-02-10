/*
  Warnings:

  - Changed the type of `availableQuantity` on the `Inventory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `reOrderLevel` on the `Inventory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "availableQuantity",
ADD COLUMN     "availableQuantity" INTEGER NOT NULL,
DROP COLUMN "reOrderLevel",
ADD COLUMN     "reOrderLevel" INTEGER NOT NULL;
