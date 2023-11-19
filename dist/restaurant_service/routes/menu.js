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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonParser = body_parser_1.default.json();
const router = express_1.default.Router();
const menu_1 = require("../methods/menu");
router.get("/get_menu", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant_id = typeof req.query.restaurant_id === "string"
        ? parseInt(req.query.restaurant_id)
        : null;
    if (restaurant_id) {
        const response = yield (0, menu_1.get_menu)(restaurant_id);
        return res.status(parseInt(String(response[0]))).send(response[1]);
    }
    else {
        return res
            .status(400)
            .send("Please send restaurant_id as a query parameter.");
    }
}));
router.post("/add_item", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant_id = req.body.restaurant_id ? req.body.restaurant_id : null;
    const name = req.body.name ? req.body.name : null;
    const price = req.body.price ? req.body.price : null;
    if (restaurant_id && name && price) {
        const response = yield (0, menu_1.add_item)(name, price, restaurant_id);
        return res.status(parseInt(response[0])).send(response[1]);
    }
    else {
        return res
            .status(400)
            .send("Did you forget to send any of the fields? (name, price, restaurant_id)");
    }
}));
router.put("/update_item", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id ? req.body.id : null;
    const name = req.body.name ? req.body.name : null;
    const price = req.body.price ? req.body.price : null;
    if (id) {
        const response = yield (0, menu_1.update_item)(id, name, price);
        return res.status(parseInt(response[0])).send(response[1]);
    }
    else {
        return res.status(400).send("Please send the id in the request body");
    }
}));
router.delete("/delete_item", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = typeof req.query.id === "string" ? parseInt(req.query.id) : null;
    if (id) {
        const response = yield (0, menu_1.remove_item)(id);
        return res.status(parseInt(response[0])).send(response[1]);
    }
    else {
        return res.status(400).send("Please send the id as a query parameter");
    }
}));
exports.default = router;
//# sourceMappingURL=menu.js.map