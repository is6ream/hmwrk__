import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsService } from "../../application/dtos/dtos/blogs.service";

const deleteBlogHandler = (async (req: Request, res: Response) => {
    try {
        const deleteBlog = await blogsService.delete(req.params.id)
        res.sendStatus(HttpStatus.Created)
    } catch (err) {
        console.error("Error deleting blog: ", err)
        res.send(HttpStatus.InternalServerError).json({ error: "An internal server occured" })
    }
}) 