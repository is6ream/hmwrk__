import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsService } from "../../application/dtos/dtos/blogs.service"
import { Request, Response } from "express";
import { Blog } from "../../domain/blog";



export const getAllBlogsHandler = (async (req: Request, res: Response) => {
    try {
        const getAllBlogs: Blog[] = await blogsService.findAll();
        res.status(HttpStatus.Ok).send(getAllBlogs);
    } catch (err) {
        console.error("Error returning blog list: ", err)
        res.send(HttpStatus.InternalServerError).json({error: "An iternal server occured"})
    }
})