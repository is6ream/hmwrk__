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
exports.setupApp = void 0;
const settings_1 = require("./settings");
const blogsRoutes_1 = require("./features/blogs/blogsRoutes");
const postRoutes_1 = require("./features/posts/postRoutes");
const express_1 = __importDefault(require("express"));
const testing_route_1 = require("./testing/routes/testing.route");
const setupApp = (app) => __awaiter(void 0, void 0, void 0, function* () {
    //мидлв для парсинга объектов
    app.use(express_1.default.json());
    //регистрация роутов
    app.use(settings_1.SETTINGS.PATH.BLOGS, blogsRoutes_1.blogsRouter);
    app.use(settings_1.SETTINGS.PATH.POSTS, postRoutes_1.postsRouter);
    app.use(settings_1.SETTINGS.PATH.TEST, testing_route_1.testingRouter);
    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });
    return app;
});
exports.setupApp = setupApp;
