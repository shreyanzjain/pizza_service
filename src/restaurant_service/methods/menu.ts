// Add menu item
// Update menu item
// Remove menu item
// Get menu
import prisma from "../model/init";

async function add_item(name: string, price: number, restaurant_id: number) {
  const menu = await prisma.menu.create({
    data: {
      name: name,
      price: price,
      restaurant_id: restaurant_id,
    },
  });

  return ["200", `Item successfully added with id: ${menu.id}`];
}

async function update_item(
  id: number,
  restaurant_id: number,
  name?: string,
  price?: number
) {
  const item = await prisma.menu.findFirst({
    where: {
      id: id,
      restaurant_id: restaurant_id,
    },
  });

  if (item) {
    const menu = await prisma.menu.update({
      where: {
        id: id,
      },
      data: {
        name: name ? name : item.name,
        price: price ? price : item.price,
      },
    });

    return ["200", `Item successfully updated with id: ${menu.id}`];
  } else {
    return ["404", `Item with id: ${id} does not exist on your restaurant.`];
  }
}

async function remove_item(id: number, restaurant_id: number) {
  const item = await prisma.menu.findFirst({
    where: {
      id: id,
      restaurant_id: restaurant_id,
    },
  });

  if (item) {
    const menu = await prisma.menu.delete({
      where: {
        id: id,
      },
    });
    return ["200", `Item successfully deleted with id: ${menu.id}`];
  } else {
    return ["404", `Item with id: ${id} does not exist on your restaurant.`];
  }
}

async function get_menu(restaurant_id: number) {
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      id: restaurant_id,
    },
  });

  const menu = await prisma.menu.findMany({
    select: {
      id: true,
      name: true,
      price: true,
    },
    where: {
      restaurant_id: restaurant_id,
    },
  });
  return ["200", menu];
}

export { add_item, get_menu, update_item, remove_item };
