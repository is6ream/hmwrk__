"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDeleteController = void 0;
const blogsRepository_1 = require("../blogs/blogsRepository");
const postsRepository_1 = require("../posts/postsRepository");
exports.testDeleteController = {
    clearDataBase(req, res) {
        blogsRepository_1.blogsRepository.clear();
        postsRepository_1.postRepository.clear();
        res.sendStatus(204);
    }
};
