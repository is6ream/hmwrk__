"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsControllers = void 0;
const db_1 = require("../db/db");
exports.postsControllers = {
    deleteAllDataController: ((req, res) => {
        db_1.db.blogs = [];
        res.status(204).send();
    }),
    getPostController: ((req, res) => {
        const posts = db_1.db.posts;
        res
            .status(200)
            .json(posts);
    }),
    createPostController: ((req, res) => {
        const postId = Date.now() + Math.random();
        const newPost = Object.assign(Object.assign({}, req.body), { id: postId.toString, title: req.body.title, shortDescription: req.body.shortDescription, content: req.body.content, blogId: req.body.blogId, blogName: 'top' });
        db_1.db.blogs.push(newPost);
        console.log(newPost);
        res.status(201).json(newPost);
    }),
    findPostController: ((req, res) => {
        const postId = +req.params.id;
        const findPost = db_1.db.posts.find(p => p.id === postId);
        if (!findPost) {
            res
                .status(404)
                .json({ message: "Пост не найден" });
        }
        res.json(findPost);
    }),
    updatePostController: ((req, res) => {
        const postId = +req.params.id;
        const findPost = db_1.db.posts.find(p => p.id === postId);
        if (!findPost) {
            res
                .status(404)
                .json({ message: 'Пост не найден' });
        }
        findPost.title = req.body.title || findPost.title;
        findPost.shortDescription = req.body.shortDescription || findPost.shortDescription;
        findPost.content = req.body.content || findPost.content;
        findPost.blogId = req.body.blogId || findPost.blogId;
    }),
    deletePostController: ((req, res) => {
        const postId = +req.params.id;
        const findPost = db_1.db.posts.find(p => p.id === postId);
        if (!findPost) {
            res
                .status(404)
                .json({ message: 'Пост не найден' });
        }
        db_1.db.posts.filter(p => p.id !== postId);
        res.status(204).send();
    })
};
