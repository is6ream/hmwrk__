"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsControllers = void 0;
const db_1 = require("./../../db/db");
const postsRepository_1 = require("./postsRepository");
exports.postsControllers = {
    deleteAllDataController: ((req, res) => {
        db_1.db.blogs = [];
        res.status(204).send();
    }),
    getPostController: ((req, res) => {
        const getAllPosts = postsRepository_1.postRepository.getAll();
        res.status(200).json(getAllPosts);
    }),
    createPostController: ((req, res) => {
        const createdPost = postsRepository_1.postRepository.createPost(req.body);
        res.status(201).json(createdPost);
    }),
    findPostController: ((req, res) => {
        const findedPost = postsRepository_1.postRepository.findPost(req.params.id);
        res.json(findedPost);
    }),
    updatePostController: ((req, res) => {
        const updatedPost = postsRepository_1.postRepository.updatePost(req.params.id, req.body);
        res.status(204).send();
    }),
    deletePostController: ((req, res) => {
        const deletedPost = postsRepository_1.postRepository.delete(req.params.id);
        res.status(204).send();
    })
};
