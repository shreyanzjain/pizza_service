// User browses the catalog with these methods
// 1. view all restaurants ONLINE in his city
// 2. View menu items, per restaurant
import prisma from "../model/init";

async function view_restaurants(entity_id: number, page?: number) {
  const user = await prisma.entity.findFirst({
    where: {
      id: entity_id,
    },
    include: {
      customer_profile: true,
    },
  });
  if (user.customer_profile) {
    const restaurants = await prisma.restaurant.findMany({
      take: 10,
      skip: page ? page * 10 : 0, // if page is provided show results on page, else beginning
      select: {
        id: true,
        name: true,
      },
      where: {
        city: {
          equals: user.customer_profile.city,
          mode: "insensitive",
        },
        status: "ONLINE",
      },
    });
    return restaurants;
  } else  {
    return ["400", "Please set up your profile."]
  }

  
}

export default view_restaurants;
