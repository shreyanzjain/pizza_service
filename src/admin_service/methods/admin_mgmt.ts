import prisma from "../model/init";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

function valid_email(email: string) {
  if (!(email.length >= 5 && email.length <= 80)) {
    return false;
  }
  return true;
}

function valid_password(password: string) {
  if (!(password.length > 0 && password.length <= 25)) {
    return false;
  } else {
    return true;
  }
}

async function create_admin(email: string, password: string) {
  const email_taken = await prisma.entity.findFirst({
    where: {
      email: email,
    },
  });
  if (!email_taken) {
    if (valid_email(email) && valid_password(password)) {
      await prisma.entity.create({
        data: {
          email: email,
          hashed_password: await bcrypt.hash(password, SALT_ROUNDS),
          role: "ADMIN",
        },
      });
      return ["200", "Created successfully"];
    } else {
      return [
        "400",
        "email length should be 5 - 80 chatacters and password should be 1 - 25 characters",
      ];
    }
  } else {
    return ["400", "Email already taken."];
  }
}

export { create_admin };
