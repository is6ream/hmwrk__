import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsService } from '../../application/dtos/dtos/blogs.service';
import { Blog } from '../../domain/blog';

export const createBlogHandler = (async (req: Request, res: Response) => {

    try {
        const createBlog: Blog = await blogsService.createBlog(req.body)
        res.status(HttpStatus.Created).json(createBlog)
    } catch (err) {
        console.error("Error creating blog: ", err)
        res.send(HttpStatus.InternalServerError).json({error: "An iternal server error occured for creating blog"})
    }
})

