-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_productId_fkey";

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;
