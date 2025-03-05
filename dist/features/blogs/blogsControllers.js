"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsControllers = void 0;
const db_1 = require("../../db/db");
exports.blogsControllers = {
    deleteAllDataController: ((req, res) => {
        db_1.db.blogs = [];
        res.status(204).send();
    }),
    getBlogsController: ((req, res) => {
        const blogs = db_1.db.blogs;
        res
            .status(200)
            .json(blogs);
    }),
    createBlogController: ((req, res) => {
        const blogId = Date.now() + Math.random();
        const newBlog = Object.assign(Object.assign({}, req.body), { id: blogId.toString(), name: req.body.name, description: req.body.description, webSiteUrl: req.body.webSiteUrl });
        db_1.db.blogs.push(newBlog);
        console.log(newBlog);
        res.status(201).json(newBlog);
        //нужно поработать с валидацией данных
    }),
    findBlogConstroller: ((req, res) => {
        const foundBlogs = blog;
        const blogId = +req.params.id;
        const findBlog = db_1.db.blogs.find(p => +p.id === blogId);
        if (!findBlog) {
            res.status(404)
                .json({ message: 'Блог не найден' });
        }
        res.json(findBlog);
    }),
    updateBlogController: ((req, res) => {
        const blogId = +req.params.id;
        const findBlog = db_1.db.blogs.find(b => +b.id === blogId);
        //здесь тоже нужна валидация и авторизация
        if (!findBlog) {
            return res
                .status(404)
                .json({ message: 'Блог не найден' });
        }
        findBlog.name = req.body.name || findBlog.name;
        findBlog.description = req.body.description || findBlog.description;
        findBlog.websiteUrl = req.body.webSiteUrl || findBlog.websiteUrl;
        return res.status(204).send();
    }),
    deleteBlogControler: ((req, res) => {
        const blogId = +req.params.id;
        const findBlog = db_1.db.blogs.find(b => +b.id === blogId);
        if (!findBlog) {
            res
                .status(404)
                .json({ message: 'Блог не найден!' });
        }
        db_1.db.blogs = db_1.db.blogs.filter(p => +p.id !== blogId);
        res.status(204).send();
    })
};
