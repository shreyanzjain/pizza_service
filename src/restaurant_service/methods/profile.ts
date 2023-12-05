import prisma from "../model/init";
import cities from "../../public/cities.json";

async function upsert_profile(entity_id: number, name?: string, city?: string) {
  if (city) {
    if (!(city in cities)) {
      return ["400", "No such city"];
    }
  }

  if (name) {
    if (!(name.length >= 1 && name.length <= 64)) {
      return ["400", "Name must be 1 - 64 characters in length"];
    }
  }

  const entity = await prisma.entity.findFirst({
    where: {
      id: entity_id,
      role: "RESTAURANT",
    },
  });

  if (entity) {
    // check if the profile exists
    const profile = await prisma.restaurant.findFirst({
      where: {
        entity_id: entity_id,
      },
    });

    if (profile) {
      // Yes -> update profile
      await prisma.restaurant.update({
        where: {
          id: profile.id,
        },
        data: {
          name: name ? name : profile.name,
          city: city ? city : profile.city,
        },
      });
      return ['200', 'Updated successfully.']
    } else {
      // No -> create profile
      if (name && city) {
        await prisma.restaurant.create({
          data: {
            name: name,
            city: city,
            entity_id: entity_id,
          },
        });
        return ['200', 'Created successfully.']
      } else {
        return ["400", "name, city not in req body"];
      }
    }
  } else {
    return ["403", "Unauthorized"];
  }
}

export { upsert_profile };
