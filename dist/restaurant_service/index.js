"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3003;
const menu_1 = __importDefault(require("./routes/menu"));
const status_1 = __importDefault(require("./routes/status"));
app.get("/", (req, res) => {
    res.status(200).send("Hello, Restaurant");
});
app.use("/menu", menu_1.default);
app.use("/status", status_1.default);
app.listen(port, () => {
    console.log(`Restaurant. Listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map