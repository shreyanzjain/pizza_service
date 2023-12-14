// 1. Add a restaurant
// 2. Delete a restaurant
import prisma from "../model/init";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function add_restaurant(email: string, password: string) {
  if (email.length <= 1 || email.length > 64) {
    return ["400", "Length of email must be between 1 - 64 characters."];
  }

  if (password.length < 8 || password.length > 25) {
    return ["400", "Please enter a password of length 8 - 25!"];
  }

  const enity = await prisma.entity.findFirst({
    where: {
      email: email,
    },
  });

  if (enity) {
    return ["400", "Email taken!"];
  }

  await prisma.entity.create({
    data: {
      hashed_password: await bcrypt.hash(password, SALT_ROUNDS),
      email: email,
      role: "RESTAURANT",
    },
  });

  return ["200", `Restaurant with email ${email} added successfully.`];
}

async function del_restaurant(id: number) {
  if (!id) {
    return ["400", "Please specify the id parameter"];
  }

  const restaurant = await prisma.entity.findFirst({
    where: {
      id: id,
      role: "RESTAURANT",
    },
  });

  if (!restaurant) {
    return ["400", "No such restaurant"];
  }

  const deleted_restaurant = await prisma.entity.delete({
    where: {
      id: restaurant.id,
    },
  });

  if (deleted_restaurant) {
    return ["200", `Restaurant ${deleted_restaurant.id} deleted successfully`];
  } else {
    return ["400", "Restaurant id does not exist in the system."];
  }
}

export { add_restaurant, del_restaurant };
