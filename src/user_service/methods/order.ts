// 1. add order to cart
//      - cart must have dishes from the same restaurant
// 2. get restaurant menu
// 3. place order

import prisma from "../model/init";

async function add_to_cart(item_id: number, customer_id: number, city: string) {
  const cart = await prisma.cart.findFirst({
    where: {
      customer_id: customer_id,
    },
  });
  // grab the item to be inserted
  const curr_item = await prisma.menu.findFirst({
    where: {
      id: item_id,
    },
    include: {
      restaurant: {
        select: {
          city: true,
          status: true,
        },
      },
    },
  });
  // if the item exists
  if (curr_item) {
    // if cart is empty
    if (!cart) {
      // if item's restaurant is from the same city as the user's city, and is online then add to cart.
      if (
        curr_item.restaurant.city.toUpperCase() == city.toUpperCase() &&
        curr_item.restaurant.status == "ONLINE"
      ) {
        await prisma.cart.create({
          data: {
            menu_id: curr_item.id,
            customer_id: customer_id,
            restaurant_id: curr_item.restaurant_id,
            qty: 1,
          },
        });
        return ["200", `${curr_item.name} added to cart.`];
      } else {
        return [
          "400",
          "This restaurant is not in your city, or it is offline.",
        ];
      }
    } else {
      // if cart is not empty & if item's restaurant is from the same city as the user's city, and is online.
      if (
        curr_item.restaurant.city.toUpperCase() == city.toUpperCase() &&
        curr_item.restaurant.status == "ONLINE"
      ) {
        const same_item = await prisma.cart.findFirst({
          where: {
            menu_id: curr_item.id,
          },
        });
        // if the same item already in cart then update quantity by +1
        if (same_item) {
          await prisma.cart.update({
            where: {
              id: same_item.id,
            },
            data: {
              qty: same_item.qty + 1,
            },
          });

          return ["200", `${curr_item.name} added to cart.`];
        } else {
          // create new item
          // if the item to be added is not from the same restaurant
          if (cart.restaurant_id != curr_item.restaurant_id) {
            await prisma.cart.deleteMany({
              where: {
                customer_id: customer_id,
              },
            });
          }
          await prisma.cart.create({
            data: {
              menu_id: curr_item.id,
              customer_id: customer_id,
              restaurant_id: curr_item.restaurant_id,
              qty: 1,
            },
          });
          return ["200", `${curr_item.name} added to cart.`];
        }
      } else {
        return [
          "400",
          "This restaurant is not in your city, or it is offline.",
        ];
      }
    }
  } else {
    return ["404", "No such item available."];
  }
}

async function get_cart(customer_id: number) {
  const cart = await prisma.cart.findMany({
    where: {
      customer_id: customer_id,
    },
  });
  return cart;
}

export { add_to_cart, get_cart };
