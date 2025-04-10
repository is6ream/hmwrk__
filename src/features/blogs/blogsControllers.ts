import { Request, Response } from "express";
import { blogsRepository } from './blogsRepository'


export const blogsControllers = {
    deleteAllDataController: ((req: Request, res: Response) => {
        console.log(`Received request: ${req.method} ${req.url}`);
        const deleteAll = blogsRepository.deleteAll()
        res.status(204).send()
    }),

    getBlogsController: (async (req: Request, res: Response) => {
        const getAllBlogs = await blogsRepository.findAll()
        console.log(getAllBlogs)
        res.status(200).json(getAllBlogs)
        console.log('getBlogs')
    }),

    createBlogController: (async (req: Request, res: Response) => {
        const createBlogs = await blogsRepository.create(req.body)
        res.status(201).json(createBlogs)
    }),

    findBlogConstroller: (async (req: Request, res: Response) => {
        const findBlog = await blogsRepository.find(req.params.id)
        res.send(findBlog)
    }),

    updateBlogController: (async (req: Request, res: Response) => {
        const updatedBlog = await blogsRepository.updateBlog(req.params.id, req.body)
        res.status(204).send()
    }),

    deleteBlogController: (async (req: Request, res: Response) => {
        const deletedBlog = await blogsRepository.delete(req.params.id)
        res.status(204).send()
    })
}
