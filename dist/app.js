"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./videos/routes");
exports.app = (0, express_1.default)(); // создать приложение
exports.app.use(express_1.default.json()); // создание свойств-объектов body и query во всех реквестах
exports.app.use((0, cors_1.default)()); // разрешить любым фронтам делать запросы на наш бэк
// app.get('/hometask_01/', (req, res) => {
//     res.status(200).json({ version: "1.0" })
// })
exports.app.use('/hometask_01/api/', routes_1.videosRouter);
// app.use('/hometask_01/api/testing/all-data', videosRouter)
