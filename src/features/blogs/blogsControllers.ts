import { postRepository } from './../posts/postsRepository';
import { ParamType } from './types';
import { title } from 'process';
import { Request, Response } from "express";
import { db } from "../../db/db";
import { BlogType } from "../../db/db";
import { blogsRepository } from './blogsRepository'



export const blogsControllers = {
    deleteAllDataController: ((req: Request, res: Response) => {
        db.blogs = [];
        res.status(204).send()
    }),
    getBlogsController: ((req: Request, res: Response) => {
        const getAllBlogs = blogsRepository.getAll()
        res.json(getAllBlogs).status(200)
    }),
    createBlogController: ((req: Request, res: Response) => {
        const createBlogs = blogsRepository.create(req.body)
        res.status(201).json(createBlogs)
        //нужно поработать с валидацией данных
    }),

    findBlogConstroller: ((req: Request, res: Response) => {
        const findBlog = blogsRepository.find(req.params)
        res.json(findBlog).status(200)
    }),

    updateBlogController: ((req: Request, res: Response) => {
        const updatedBlog = blogsRepository.updateBlog(req.body)
        return res.status(204).send()
    }),

    deleteBlogControler: ((req: Request, res: Response) => {
        const deletedBlog = blogsRepository.delete(req.params)
        res.status(204).send()
    })
}
