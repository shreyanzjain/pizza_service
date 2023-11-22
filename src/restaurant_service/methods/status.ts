// Update restaurant status
import prisma from "../model/init";

async function set_status(status: number, restaurant_id: number) {
  const updated_restaurant = await prisma.restaurant.update({
    where: {
      id: restaurant_id,
    },
    data: {
      status: status == 1 ? "ONLINE" : "OFFLINE",
    },
  });

  return [
    "200",
    `Status of restaurant with id: ${updated_restaurant.id} updated successfully.`,
  ];
}

export { set_status };
