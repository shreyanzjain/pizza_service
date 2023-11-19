// User browses the catalog with these methods
// 1. view all restaurants ONLINE in his city
// 2. View menu items, per restaurant
import prisma from "../model/init";

async function view_restaurants(city: string, page?: number) {
  const restaurants = await prisma.restaurant.findMany({
    take: 10,
    skip: page ? page * 10 : 0, // if page is provided show results on page, else beginning
    select: {
      name: true,
    },
    where: {
      city: {
        equals: city,
        mode: 'insensitive'
      },
      status: "ONLINE",
    },
  });

  return restaurants;
}

export default view_restaurants;
