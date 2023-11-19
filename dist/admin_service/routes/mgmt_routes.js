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
const restaurant_mgmt_1 = require("../methods/restaurant_mgmt");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/add_restaurant", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = typeof (req.query.name) === "string" ? req.query.name : null;
    const city = typeof (req.query.city) === "string" ? req.query.city : null;
    const password = typeof (req.query.password) === "string" ? req.query.password : null;
    console.log(name, city, password);
    const response = yield (0, restaurant_mgmt_1.add_restaurant)(name, city, password);
    res.status(parseInt(response[0])).send(response[1]);
}));
router.delete("/delete_restaurant", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = typeof (req.query.id) === "string" ? parseInt(req.query.id) : null;
    const response = yield (0, restaurant_mgmt_1.del_restaurant)(id);
    res.status(parseInt(response[0])).send(response[1]);
}));
exports.default = router;
//# sourceMappingURL=mgmt_routes.js.map