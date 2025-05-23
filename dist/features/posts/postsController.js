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
exports.postsControllers = void 0;
const postsRepository_1 = require("./postsRepository");
const http_statuses_1 = require("../../core/http-statuses");
exports.postsControllers = {
    deleteAllDataController: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedAllData = yield postsRepository_1.postRepository.deleteAll();
        res.sendStatus(http_statuses_1.HttpStatus.NoContent);
    })),
    getPostController: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getAllPosts = yield postsRepository_1.postRepository.findAll();
        res.status(200).json(getAllPosts);
    })),
    createPostController: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const createdPost = yield postsRepository_1.postRepository.create(req.body);
        res.status(201).json(createdPost);
    })),
    findPostController: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const findedPost = yield postsRepository_1.postRepository.findById(req.params.id);
        res.json(findedPost);
    })),
    updatePostController: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedPost = yield postsRepository_1.postRepository.updatePost(req.params.id, req.body);
        res.status(204).send();
    })),
    deletePostController: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedPost = yield postsRepository_1.postRepository.delete(req.params.id);
        res.status(204).send();
    }))
};
