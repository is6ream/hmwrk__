import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { errorsHandler } from "../../../core/errors/errors.handler";
// import { blogsService}

export async function deleteBlogHandler(
    req: Request<{ id: string }>,
    res: Response
) {
    try {
        const id = req.params.id
        await blogsService.delete(id) //нужно прописать сервис
    }
    
}