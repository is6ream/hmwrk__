"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsControllers = void 0;
const db_1 = require("../../db/db");
const blogsRepository_1 = require("./blogsRepository");
exports.blogsControllers = {
    deleteAllDataController: ((req, res) => {
        db_1.db.blogs = [];
        res.status(204).send();
    }),
    getBlogsController: ((req, res) => {
        const getAllBlogs = blogsRepository_1.blogsRepository.getAll();
        res.json(getAllBlogs).status(200);
    }),
    createBlogController: ((req, res) => {
        const createBlogs = blogsRepository_1.blogsRepository.create(req.body);
        res.status(201).json(createBlogs);
        //нужно поработать с валидацией данных
    }),
    findBlogConstroller: ((req, res) => {
        const findBlog = blogsRepository_1.blogsRepository.find(req.params.id);
        res.json(findBlog).status(200);
    }),
    updateBlogController: ((req, res) => {
        const updatedBlog = blogsRepository_1.blogsRepository.updateBlog(req.params.id, req.body);
        return res.status(204).send();
    }),
    deleteBlogControler: ((req, res) => {
        const deletedBlog = blogsRepository_1.blogsRepository.delete(req.params.id);
        res.status(204).send();
    })
};
