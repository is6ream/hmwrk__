import { body } from 'express-validator';
import { Request, Response } from "express";
import { HttpStatus } from '../core/types/http-statuses';
import { blogsService } from './application/dtos/dtos/blogs.service';

export const blogsControllers = {


    deleteAllDataController: (async (req: Request, res: Response) => {
        console.log(`Received request: ${req.method} ${req.url}`);
        const deleteAll = await blogsService.deleteAll()
        res.sendStatus(HttpStatus.NoContent)
    }),

    getBlogsController: (async (req: Request, res: Response) => {
        const getAllBlogs = await blogsService.findAll()
        res.status(HttpStatus.Ok).json(getAllBlogs)
    }),

    createBlogController: (async (req: Request, res: Response) => {
        const createBlogs = await blogsService.createBlog(req.body)
        res.status(HttpStatus.Created).json(createBlogs)
    }),

    findBlogConstroller: (async (req: Request, res: Response) => {
        const findBlog = await blogsService.findById(req.params.id);

        if (!findBlog) {
            res.status(HttpStatus.NotFound).json({
                message: "Blog not found"
            });
        }
        res.status(HttpStatus.Ok).json(findBlog);
    }),

    updateBlogController: (async (req: Request, res: Response) => {
        const updatedBlog = await blogsService.updateBlog(req.params.id, req.body);
        res.sendStatus(HttpStatus.NoContent);
    }),

    deleteBlogController: (async (req: Request, res: Response) => {
        const deletedBlog = await blogsService.delete(req.params.id);
        res.sendStatus(HttpStatus.NoContent);
    })
}
