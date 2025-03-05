import { Router } from "express";
import { postsControllers } from "../posts/postsController";


export const postsRouter = Router()

postsRouter.get('/blogs', postsControllers.getPostController)
postsRouter.post('/blogs', postsControllers.createPostController)
postsRouter.get('/blogs/:id', postsControllers.findPostController)
postsRouter.delete('/testing/all-data', postsControllers.deleteAllDataController)
postsRouter.delete('/blogs/:id', postsControllers.deletePostController)
postsRouter.put('/blogs/:id', postsControllers.updatePostController)