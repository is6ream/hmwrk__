"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsControllers = void 0;
const blogsRepository_1 = require("./blogsRepository");
exports.blogsControllers = {
    deleteAllDataController: ((req, res) => {
        console.log(`Received request: ${req.method} ${req.url}`);
        const deleteAll = blogsRepository_1.blogsRepository.deleteAll();
        res.status(204).send();
    }),
    getBlogsController: ((req, res) => {
        const getAllBlogs = blogsRepository_1.blogsRepository.getAll();
        res.status(200).json(getAllBlogs);
        console.log('getBlogs');
    }),
    createBlogController: ((req, res) => {
        const createBlogs = blogsRepository_1.blogsRepository.create(req.body);
        res.status(201).json(createBlogs);
    }),
    findBlogConstroller: ((req, res) => {
        const findBlog = blogsRepository_1.blogsRepository.find(req.params.id);
        if (!findBlog) {
            res.status(404).json({ message: "Blog not found" });
        }
        res.json(findBlog).status(200);
    }),
    updateBlogController: ((req, res) => {
        const updatedBlog = blogsRepository_1.blogsRepository.updateBlog(req.params.id, req.body);
        res.status(204).send();
    }),
    deleteBlogControler: ((req, res) => {
        const deletedBlog = blogsRepository_1.blogsRepository.delete(req.params.id);
        res.status(204).send();
    })
};
