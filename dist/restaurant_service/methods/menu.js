"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove_item = exports.update_item = exports.get_menu = exports.add_item = void 0;
// Add menu item
// Update menu item
// Remove menu item
// Get menu
const init_1 = __importDefault(require("../model/init"));
function add_item(name, price, restaurant_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const restaurant = yield init_1.default.restaurant.findFirst({
            where: {
                id: restaurant_id,
            },
        });
        if (restaurant) {
            const menu = yield init_1.default.menu.create({
                data: {
                    name: name,
                    price: price,
                    restaurant_id: restaurant_id,
                },
            });
            return ["200", `Item successfully added with id: ${menu.id}`];
        }
        else {
            return ["404", `Restaurant with id: ${restaurant_id} does not exist`];
        }
    });
}
exports.add_item = add_item;
function update_item(id, name, price) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield init_1.default.menu.findFirst({
            where: {
                id: id,
            },
        });
        if (item) {
            const menu = yield init_1.default.menu.update({
                where: {
                    id: id,
                },
                data: {
                    name: name ? name : item.name,
                    price: price ? price : item.price,
                },
            });
            return ["200", `Item successfully updated with id: ${menu.id}`];
        }
        else {
            return ["404", `Item with id: ${id} does not exist`];
        }
    });
}
exports.update_item = update_item;
function remove_item(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield init_1.default.menu.findFirst({
            where: {
                id: id,
            },
        });
        if (item) {
            const menu = yield init_1.default.menu.delete({
                where: {
                    id: id,
                },
            });
            return ["200", `Item successfully deleted with id: ${menu.id}`];
        }
        else {
            return ["404", `Item with id: ${id} does not exist`];
        }
    });
}
exports.remove_item = remove_item;
function get_menu(restaurant_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const restaurant = yield init_1.default.restaurant.findFirst({
            where: {
                id: restaurant_id,
            },
        });
        if (restaurant) {
            const menu = yield init_1.default.menu.findMany({
                select: {
                    name: true,
                    price: true,
                },
                where: {
                    restaurant_id: restaurant_id,
                },
            });
            return ["200", menu];
        }
        else {
            return ["404", `Restaurant with id: ${restaurant_id} does not exist`];
        }
    });
}
exports.get_menu = get_menu;
//# sourceMappingURL=menu.js.map