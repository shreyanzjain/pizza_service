/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `restaurants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "email" VARCHAR(80) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_email_key" ON "restaurants"("email");
