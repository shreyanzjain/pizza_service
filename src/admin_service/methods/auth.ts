import prisma from "../model/init";
import bcrypt from "bcrypt";

async function login(email: string, password: string) {
  const admin = await prisma.entity.findFirst({
    where: {
      email: email,
      role: "ADMIN",
    },
  });

  if(admin) {
    if(await bcrypt.compare(password, admin.hashed_password)){
        return ["200", {entity_id: admin.id, role: admin.role}];
    }   else {
        return ["400", "Incorrect credentials."]
    }
  } else {
    return ["400", "No such admin."];
  }
}

export {login};