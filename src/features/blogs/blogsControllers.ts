import { Request, Response } from "express";
import { blogsRepository } from './blogsRepository'
import { HttpStatus } from "../../core/http-statuses";

export const blogsControllers = {
    deleteAllDataController: ((req: Request, res: Response) => {
        console.log(`Received request: ${req.method} ${req.url}`);
        const deleteAll = blogsRepository.deleteAll()
        res.sendStatus(HttpStatus.NoContent)
    }),

    getBlogsController: (async (req: Request, res: Response) => {
        const getAllBlogs = await blogsRepository.findAll()
        console.log(getAllBlogs)
        res.status(HttpStatus.Ok).json(getAllBlogs)
    }),

    createBlogController: (async (req: Request, res: Response) => {
        const createBlogs = await blogsRepository.createBlog(req.body)
        res.status(HttpStatus.Created).json(createBlogs)
    }),

    findBlogConstroller: (async (req: Request, res: Response) => {
        const findBlog = await blogsRepository.findById(req.params.id)
        res.status(HttpStatus.Ok).json(findBlog)
    }),

    updateBlogController: (async (req: Request, res: Response) => {
        const updatedBlog = await blogsRepository.updateBlog(req.params.id, req.body)
        res.sendStatus(HttpStatus.NoContent)
    }),

    deleteBlogController: (async (req: Request, res: Response) => {
        const deletedBlog = await blogsRepository.delete(req.params.id)
        res.sendStatus(HttpStatus.NoContent)
    })
}
