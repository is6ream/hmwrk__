import { Request, Response, Router } from "express";
import { postCollection, blogCollection } from "../../db/mongo";
import { blogsControllers } from "../../blogs/blogsControllers";
import { blogsRepository } from "../../blogs/repositories/blogsRepository";
import { postRepository } from "../../posts/postsRepository";

export const testingRouter = Router();

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    console.log('Здесь не работает')
    await Promise.all([
        blogsRepository.deleteAll(),
        postRepository.deleteAll()
    ]);
    res.sendStatus(204)
})

