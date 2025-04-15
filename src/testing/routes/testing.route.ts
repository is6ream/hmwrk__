import { Request, Response, Router } from "express";
import { postCollection, blogCollection } from "../../db/mongo";
import { blogsControllers } from "../../features/blogs/blogsControllers";
import { blogsRepository } from "../../features/blogs/blogsRepository";
import { postRepository } from "../../features/posts/postsRepository";

export const testingRouter = Router();

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    console.log('Здесь не работает')
    await Promise.all([
        blogsRepository.deleteAll(),
        postRepository.deleteAll()
    ]);
    res.sendStatus(204)
})

