import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsService } from "../../application/dtos/dtos/blogs.service"
import { Request, Response } from "express";
import { Blog } from "../../domain/blog";
import { BlogQueryInput } from "../input/blog-query.input";



export const getAllBlogsHandler = (async (
    req: Request<{}, {}, {}, BlogQueryInput>,
    res: Response) => {
    try {
        const getAllBlogs: Blog[] = await blogsService.findAll();
        res.status(HttpStatus.Ok).send(getAllBlogs);
    } catch (err) {
        console.error("Error returning blog list: ", err)
        res.send(HttpStatus.InternalServerError).json({ error: "An iternal server occured" })
    }
})



export async function getBlogsHandler(
    req: Request<{}, {}, {}, BlogQueryInput>,
    res: Response) {
    try {
        const queryInput = req.query;
        const { items, totalCount } = await blogsService.findMany(queryInput); //items, totalCount

        const blogsListToOutput = 
    }
}