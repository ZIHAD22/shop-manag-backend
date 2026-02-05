-- DropForeignKey
ALTER TABLE "ShopOwner" DROP CONSTRAINT "ShopOwner_email_fkey";

-- AddForeignKey
ALTER TABLE "ShopOwner" ADD CONSTRAINT "ShopOwner_email_fkey" FOREIGN KEY ("email") REFERENCES "Auth"("email") ON DELETE CASCADE ON UPDATE CASCADE;
