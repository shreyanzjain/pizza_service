-- AlterTable
CREATE SEQUENCE admins_id_seq;
ALTER TABLE "admins" ALTER COLUMN "id" SET DEFAULT nextval('admins_id_seq');
ALTER SEQUENCE admins_id_seq OWNED BY "admins"."id";

-- AlterTable
CREATE SEQUENCE customers_id_seq;
ALTER TABLE "customers" ALTER COLUMN "id" SET DEFAULT nextval('customers_id_seq');
ALTER SEQUENCE customers_id_seq OWNED BY "customers"."id";

-- AlterTable
CREATE SEQUENCE restaurants_id_seq;
ALTER TABLE "restaurants" ALTER COLUMN "id" SET DEFAULT nextval('restaurants_id_seq');
ALTER SEQUENCE restaurants_id_seq OWNED BY "restaurants"."id";
