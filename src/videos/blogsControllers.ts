import { inputVideoType } from './types';
import { Request, Response } from "express";
import { db } from "../db/db";
import { inputValidation } from './validation';
import { putInputValidation } from './validation';
import { error } from 'console';


export const blogsControllers = {
    deleteAllDataController: ((req: Request, res: Response) => {
        db.blogs = [];
        res.status(204).send()
    }),
    getBlogsController: ((req: Request, res: Response) => {
        const blogs = db.blogs
        res
            .status(200)
            .json(blogs)
    }),
    createBlogController: ((req: Request, res: Response) => {
        const blogId: number = Date.now() + Math.random()
        const newBlog = {
            ...req.body,

            id: blogId.toString(),
            name: req.body.name,
            description: req.body.description,
            webSiteUrl: req.body.webSiteUrl
        }
        db.blogs.push(newBlog)
        console.log(newBlog)
        res.status(201).json(newBlog)
        //нужно поработать с валидацией данных
    }),

    findBlogConstroller: ((req: Request, res: Response) => {
        const blogId: number = +req.params.id;
        const findBlog = db.blogs.find(p => p.id === blogId)

        if (!findBlog) {
            res.status(404)
                .json({ message: 'Блог не найден' })
        }
        res.json(findBlog)

    }),

    updateBlogController: ((req: Request, res: Response) => {
        const blogId: number = +req.params.id;
        const findBlog = db.blogs.find(b => b.id === blogId)
        //здесь тоже нужна валидация и авторизация
        if (!findBlog) {
            res
                .status(404)
                .json({ message: 'Блог не найден' })
        }
        findBlog.name = req.body.name || findBlog.name
        findBlog.description = req.body.description || findBlog.description
        findBlog.webSiteUrl = req.body.webSiteUrl || findBlog.webSiteUrl
    }),

    deleteBlogControler: ((req: Request, res: Response) => {
        const blogId: number = +req.params.id;
        const findBlog = db.blogs.find(b => b.id === blogId)
        if (!findBlog) {
            res
                .status(404)
                .json({ message: 'Блог не найден!' });
        }
        db.blogs = db.blogs.filter(p => p.id !== blogId)
        res.status(204).send()
    })
}

