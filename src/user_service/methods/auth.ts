import prisma from "../model/init";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function signup(
  email: string,
  name: string,
  city: string,
  password: string
) {
  const user = await prisma.customer.findFirst({
    where: {
      email: email,
    },
  });
  // if user exists
  if (user) {
    return ["400", `User with email ${email} exists.`];
  }

  const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);
  const new_user = await prisma.customer.create({
    data: {
      email: email,
      name: name,
      city: city,
      hashed_password: hashed_password,
    },
  });

  return ["200", `User with email ${new_user.email} created successfully`];
}

async function login(email: string, password: string) {
  const user = await prisma.customer.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    const is_valid_password = await bcrypt.compare(
      password,
      user.hashed_password
    );
    if (is_valid_password) {
      return { id: user.id, city: user.city };
    } else {
      return `Invalid password!`;
    }
  } else {
    return `No such user!`;
  }
}

export { signup, login };
