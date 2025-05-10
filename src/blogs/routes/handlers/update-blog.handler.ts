import { HttpStatus } from "../../../core/types/http-statuses"
import { blogsService } from "../../application/dtos/dtos/blogs.service"
import { Request, Response } from "express"


export const updateBlogHandler = (async (req: Request, res: Response) => {
    try {
        const updatedBlog = await blogsService.updateBlog(req.params.id, req.body)
        res.sendStatus(HttpStatus.NoContent)
    } catch(err){
        console.error("Error updating blog: ", err);
        res.sendStatus(HttpStatus.InternalServerError).json({error: "An internal server occured while updating the blog"})
    }
})