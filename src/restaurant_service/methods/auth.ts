import prisma from "../model/init";
import bcrypt from "bcrypt";

async function login(email: string, password: string) {
  const restaurant = await prisma.entity.findFirst({
    where: {
      email: email,
      role: "RESTAURANT"
    }
  });

  if (restaurant) {
    const compares = await bcrypt.compare(password, restaurant.hashed_password);
    if(compares)  {
      return ['200', {id: restaurant.id, role: restaurant.role}];
    } else  {
      return ["400", `Password mismatch.`]
    }
  } else  {
    return ["400", `No such restaurant exists.`]
  }
}

export { login };
