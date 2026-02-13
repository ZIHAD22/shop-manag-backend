-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_inventoryId_fkey";

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("inventoryId") ON DELETE CASCADE ON UPDATE CASCADE;
