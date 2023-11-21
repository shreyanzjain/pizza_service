/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "email" VARCHAR(80) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");
