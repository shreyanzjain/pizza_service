// Add menu item
// Update menu item
// Remove menu item
// Get menu
import prisma from "../model/init";

function valid_name(name: string) {
  if (name.length >= 1 && name.length <= 64) {
    return true;
  }
  return false;
}

function valid_price(price: number) {
  if (price > 0 && price <= 1000000) {
    return true;
  }
  return false;
}

async function add_item(name: string, price: number, entity_id: number) {
  if (name && price) {
    if (!(valid_name(name) && valid_price(price))) {
      return [
        "400",
        "Name must be 1-64 characters long, and the price must be between 1 - 1000000 (1 million)",
      ];
    }
  } else {
    return ["400", "name, price not in req body"];
  }
  const restaurant_profile = await prisma.restaurant.findFirst({
    where: {
      entity_id: entity_id,
    },
  });
  if (restaurant_profile) {
    const menu = await prisma.menu.create({
      data: {
        name: name,
        price: price,
        restaurant_id: restaurant_profile.id,
      },
    });

    return ["200", `Item successfully added with id: ${menu.id}`];
  } else {
    return [
      "404",
      `Please create your restaurant's profile before trying to add items.`,
    ];
  }
}

async function update_item(
  id: number,
  entity_id: number,
  name?: string,
  price?: number
) {
  if (name) {
    if (!valid_name(name)) {
      return ["400", "Name must be 1 - 64 characters long"];
    }
  }

  if (price) {
    if (!valid_price(price)) {
      return ["400", "Price must be between 1 - 1000000 (1 million)."];
    }
  }
  const restaurant_profile = await prisma.restaurant.findFirst({
    where: {
      entity_id: entity_id,
    },
  });

  if (restaurant_profile) {
    const item = await prisma.menu.findFirst({
      where: {
        id: id,
        restaurant_id: restaurant_profile.id,
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
  } else {
    return [
      "404",
      `Please create your restaurant's profile before trying to update items.`,
    ];
  }
}

async function remove_item(id: number, entity_id: number) {
  const restaurant_profile = await prisma.restaurant.findFirst({
    where: {
      entity_id: entity_id,
    },
  });

  if (restaurant_profile) {
    const item = await prisma.menu.findFirst({
      where: {
        id: id,
        restaurant_id: restaurant_profile.id,
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
  } else {
    return [
      "404",
      `Please create your restaurant's profile before trying to update items.`,
    ];
  }
}

async function get_menu(entity_id: number) {
  const restaurant_profile = await prisma.restaurant.findFirst({
    where: {
      entity_id: entity_id,
    },
  });
  if (restaurant_profile) {
    const menu = await prisma.menu.findMany({
      select: {
        id: true,
        name: true,
        price: true,
      },
      where: {
        restaurant_id: restaurant_profile.id,
      },
    });
    if (menu.length != 0) {
      return ["200", menu];
    } else {
      return ["404", "The restaurant does not have a menu."];
    }
  } else {
    return ["404", "The restaurant does not have a menu."];
  }
}

export { add_item, get_menu, update_item, remove_item };
