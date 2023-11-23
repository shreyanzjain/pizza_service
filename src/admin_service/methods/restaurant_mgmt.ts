// 1. Add a restaurant
// 2. Delete a restaurant
import prisma from "../model/init";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

async function add_restaurant(name: string, city: string, email:string, password: string) {
  if (name.length <= 1 || name.length > 64) {
    return [
      "400",
      "Length of restaurant name must be between 1 - 64 characters.",
    ];
  }
  if (city.length <= 1 || city.length > 64) {
    return [
      "400",
      "Length of restaurant city must be between 1 - 64 characters.",
    ];
  }
  if (email.length <= 1 || email.length > 64) {
    return [
      "400",
      "Length of restaurant email must be between 1 - 64 characters.",
    ];
  }
  const restaurant = await prisma.restaurant.create({
    data: {
      name: name,
      city: city,
      hashed_password: await bcrypt.hash(password, SALT_ROUNDS),
      email: email
    },
  });

  if (restaurant) {
    return ["200", `Restaurant ${restaurant.name} added successfully.`];
  }
}

async function del_restaurant(id: number) {
  if (id == null) {
    return ["400", "Please specify the id parameter"];
  }
  const deleted_restaurant = await prisma.restaurant.delete({
    where: {
      id: id,
    },
  });

  if (deleted_restaurant) {
    return ["200", `Restaurant ${deleted_restaurant.id} deleted successfully`];
  } else {
    return ["400", "Restaurant id does not exist in the system."];
  }
}

export { add_restaurant, del_restaurant };
