-- CreateTable
CREATE TABLE "admins" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "hashed_password" VARCHAR(60) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_id_key" ON "admins"("id");
