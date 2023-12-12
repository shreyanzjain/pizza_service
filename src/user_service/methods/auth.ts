import prisma from "../model/init";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function register(
  email: string,
  password: string,
  name: string,
  city: string
) {
  const user = await prisma.entity.findFirst({
    where: {
      email: email,
    },
  });
  // if user exists
  if (user) {
    return ["400", `Email already taken.`];
  }

  const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);
  const new_user = await prisma.entity.create({
    data: {
      email: email,
      hashed_password: hashed_password,
      role: "CUSTOMER",
    },
  });

  await prisma.customer.create({
    data: {
      name: name,
      city: city,
      entity_id: new_user.id,
    },
  });

  return ["200", `User with email ${new_user.email} created successfully`];
}

async function login(email: string, password: string) {
  const user = await prisma.entity.findFirst({
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
      return { entity_id: user.id, role: user.role };
    } else {
      return `Invalid password!`;
    }
  } else {
    return `No such user!`;
  }
}

export { register, login };
