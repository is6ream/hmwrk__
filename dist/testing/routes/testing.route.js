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
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const blogsRepository_1 = require("../../features/blogs/blogsRepository");
const postsRepository_1 = require("../../features/posts/postsRepository");
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete('/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Здесь не работает');
    yield Promise.all([
        blogsRepository_1.blogsRepository.deleteAll,
        postsRepository_1.postRepository.deleteAll()
    ]);
    res.sendStatus(204);
}));
