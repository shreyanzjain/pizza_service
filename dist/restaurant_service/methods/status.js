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
exports.set_status = void 0;
// Update restaurant status
const init_1 = __importDefault(require("../model/init"));
function set_status(status, restaurant_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const restaurant = yield init_1.default.restaurant.findFirst({
            where: {
                id: restaurant_id,
            },
        });
        if (restaurant) {
            const updated_restaurant = yield init_1.default.restaurant.update({
                where: {
                    id: restaurant_id,
                },
                data: {
                    status: status == 1 ? "ONLINE" : "OFFLINE",
                },
            });
            return ["200", `Status of restaurant with id: ${updated_restaurant.id} updated successfully.`];
        }
        else {
            return ["404", `Restaurant with id: ${restaurant_id} does not exist.`];
        }
    });
}
exports.set_status = set_status;
//# sourceMappingURL=status.js.map