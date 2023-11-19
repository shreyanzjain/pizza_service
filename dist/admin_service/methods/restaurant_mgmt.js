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
exports.del_restaurant = exports.add_restaurant = void 0;
// 1. Add a restaurant
// 2. Delete a restaurant
const init_1 = __importDefault(require("../model/init"));
function add_restaurant(name, city, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (name.length <= 1 || name.length > 64) {
            return [
                "400",
                "Length of restaurant name must be between 1 - 64 characters.",
            ];
        }
        if (city.length <= 1 || city.length > 64) {
            return [
                "400",
                "Length of restaurant city must be between 1 - 64 characters.",
            ];
        }
        const restaurant = yield init_1.default.restaurant.create({
            data: {
                name: name,
                city: city,
                hashed_password: `fakehashed${password}`,
            },
        });
        if (restaurant) {
            return ["200", `Restaurant ${restaurant.name} added successfully.`];
        }
    });
}
exports.add_restaurant = add_restaurant;
function del_restaurant(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (id == null) {
            return ["400", "Please specify the id parameter"];
        }
        const deleted_restaurant = yield init_1.default.restaurant.delete({
            where: {
                id: id,
            },
        });
        if (deleted_restaurant) {
            return ["200", `Restaurant ${deleted_restaurant.id} deleted successfully`];
        }
        else {
            return ["400", "Restaurant id does not exist in the system."];
        }
    });
}
exports.del_restaurant = del_restaurant;
//# sourceMappingURL=restaurant_mgmt.js.map