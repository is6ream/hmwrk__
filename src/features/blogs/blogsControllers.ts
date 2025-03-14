import { Request, Response } from "express";
import { db } from "../../db/db";
import { blogsRepository } from './blogsRepository'


export const blogsControllers = {
    deleteAllDataController: ((req: Request, res: Response) => {
        console.log(`Received request: ${req.method} ${req.url}`);
        const deleteAll = blogsRepository.deleteAll()
        res.status(204).send()
    }),

    getBlogsController: ((req: Request, res: Response) => {
        const getAllBlogs = blogsRepository.getAll()
        res.status(200).json(getAllBlogs)
        console.log('getBlogs')
    }),

    createBlogController: ((req: Request, res: Response) => {
        const createBlogs = blogsRepository.create(req.body)
        res.status(201).json(createBlogs)
    }),

    findBlogConstroller: ((req: Request, res: Response) => {
        const findBlog = blogsRepository.find(req.params.id)
        if (!findBlog) {
            res.status(404).json({ message: "Blog not found" })
        }
        res.json(findBlog).status(200)
    }),

    updateBlogController: ((req: Request, res: Response) => {
        const updatedBlog = blogsRepository.updateBlog(req.params.id, req.body)
        res.status(204).send()
    }),

    deleteBlogControler: ((req: Request, res: Response) => {
        const deletedBlog = blogsRepository.delete(req.params.id)
        if(!deletedBlog){
            res.status(404).json({message: "Blog not found"})
        }
        res.status(204).send()
    })

    //Может быть затык с эндпоинтом delete
}
