"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const browse_routes_1 = __importDefault(require("./routes/browse_routes"));
const app = (0, express_1.default)();
const port = 3001;
app.get("/", (req, res) => {
    console.log("/");
    res.status(200).send("Hello, World");
});
app.use("/browse", browse_routes_1.default);
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map