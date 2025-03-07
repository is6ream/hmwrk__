import { Router } from "express";
import { postsControllers } from "../posts/postsController";


export const postsRouter = Router()

postsRouter.get('/posts', postsControllers.getPostController)
postsRouter.post('/posts', postsControllers.createPostController)
postsRouter.get('/posts/:id', postsControllers.findPostController)
postsRouter.delete('/testing/all-data', postsControllers.deleteAllDataController)
postsRouter.delete('/posts/:id', postsControllers.deletePostController)
postsRouter.put('/posts/:id', postsControllers.updatePostController)