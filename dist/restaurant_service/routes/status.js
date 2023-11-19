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
const router = express_1.default.Router();
const status_1 = require("../methods/status");
router.put("/set", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = typeof req.query.status === "string"
        ? req.query.status.toUpperCase()
        : null;
    const restaurant_id = typeof req.query.restaurant_id === "string"
        ? parseInt(req.query.restaurant_id)
        : null;
    if (status && restaurant_id) {
        if (status == "ONLINE" || status == "OFFLINE") {
            const response = yield (0, status_1.set_status)(status == "ONLINE" ? 1 : 0, restaurant_id);
            return res.status(parseInt(response[0])).send(response[1]);
        }
        else {
            return res
                .status(400)
                .send("Please put status (OFFLINE or ONLINE) as a query parameter");
        }
    }
    else {
        return res
            .status(400)
            .send("Please put status (OFFLINE or ONLINE), and restaurant_id as a query parameter");
    }
}));
exports.default = router;
//# sourceMappingURL=status.js.map