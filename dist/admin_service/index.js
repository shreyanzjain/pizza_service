"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mgmt_routes_1 = __importDefault(require("./routes/mgmt_routes"));
const app = (0, express_1.default)();
const port = 3001;
app.get("/", (req, res) => {
    console.log("/");
    res.status(200).send("Hello, Admin");
});
app.use('/admin', mgmt_routes_1.default);
app.listen(port, () => {
    console.log(`Admin. Listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map