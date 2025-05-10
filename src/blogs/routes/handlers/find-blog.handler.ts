import { blogsService } from "../../application/dtos/dtos/blogs.service"
import { Request, Response } from "express"
import { Blog } from "../../domain/blog";
import { HttpStatus } from "../../../core/types/http-statuses";


export const findBlogHandler = (async (req: Request, res: Response) => {
    const findBlog: Blog = await blogsService.findById(req.params.id);
    if (!findBlog) {
        res.status(HttpStatus.NotFound).json({
            message: "Blog not found"
        })
    }
    res.send(HttpStatus.Ok).json(findBlog)
})