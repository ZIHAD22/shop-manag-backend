/*
  Warnings:

  - Changed the type of `costPrice` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sellingPrice` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `texPercentage` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "costPrice",
ADD COLUMN     "costPrice" INTEGER NOT NULL,
DROP COLUMN "sellingPrice",
ADD COLUMN     "sellingPrice" INTEGER NOT NULL,
DROP COLUMN "texPercentage",
ADD COLUMN     "texPercentage" INTEGER NOT NULL;
