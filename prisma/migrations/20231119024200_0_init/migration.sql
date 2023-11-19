-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "city" VARCHAR(64) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");
