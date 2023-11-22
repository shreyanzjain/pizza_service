import prisma from "../model/init";
import bcrypt from "bcrypt";

async function login(email: string, password: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      email: email,
    },
  });

  const compares = await bcrypt.compare(password, restaurant.hashed_password);

  if(compares)  {
    return {id: restaurant.id};
  }
}

export { login };
