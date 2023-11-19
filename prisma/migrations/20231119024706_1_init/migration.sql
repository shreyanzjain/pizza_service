/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ONLINE', 'OFFLINE');

-- DropTable
DROP TABLE "Customer";

-- CreateTable
CREATE TABLE "customers" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "city" VARCHAR(64) NOT NULL,
    "hashed_password" VARCHAR(60) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "city" VARCHAR(64) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'OFFLINE',
    "hashed_password" VARCHAR(60) NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_id_key" ON "customers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_id_key" ON "restaurants"("id");
