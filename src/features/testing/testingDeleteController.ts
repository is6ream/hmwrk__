import { blogsRepository } from "../blogs/blogsRepository";
import { Request, Response } from "express";
import { postRepository } from "../posts/postsRepository";

export const testDeleteController = {
     clearDataBase(req: Request, res: Response) {
         blogsRepository.clear()
         postRepository.clear()

        res.sendStatus(204)
    }
}

