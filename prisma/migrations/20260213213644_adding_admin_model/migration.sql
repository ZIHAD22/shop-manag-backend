/*
  Warnings:

  - Made the column `role` on table `Auth` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Auth" ALTER COLUMN "role" SET NOT NULL;

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "profilePic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_email_fkey" FOREIGN KEY ("email") REFERENCES "Auth"("email") ON DELETE CASCADE ON UPDATE CASCADE;
