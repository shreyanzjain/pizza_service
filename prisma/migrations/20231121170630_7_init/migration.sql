/*
  Warnings:

  - You are about to drop the column `name` on the `admins` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "name",
ADD COLUMN     "username" VARCHAR(64) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");
