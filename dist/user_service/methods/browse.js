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
// User browses the catalog with these methods
// 1. view all restaurants ONLINE in his city
// 2. View menu items, per restaurant
const init_1 = __importDefault(require("../model/init"));
function view_restaurants(city, page) {
    return __awaiter(this, void 0, void 0, function* () {
        const restaurants = yield init_1.default.restaurant.findMany({
            take: 10,
            skip: page ? page * 10 : 0,
            select: {
                id: true,
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
    });
}
exports.default = view_restaurants;
//# sourceMappingURL=browse.js.map