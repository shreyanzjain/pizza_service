-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "menu_id_key" ON "menu"("id");

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
