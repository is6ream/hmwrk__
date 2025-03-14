import { Router } from "express";
import { postsControllers } from "../posts/postsController";
import { findPostValidator, postValidators } from "./middlewares/postValidators";
import { adminMiddleware } from "../../global-middlewares/admin-middleware";


export const postsRouter = Router()

postsRouter.get('/posts', postsControllers.getPostController)
postsRouter.post('/posts', ...postValidators, postsControllers.createPostController)
postsRouter.get('/posts/:id', findPostValidator, postsControllers.findPostController)
postsRouter.delete('/posts/:id', adminMiddleware, findPostValidator, postsControllers.deletePostController)
postsRouter.put('/posts/:id', findPostValidator, ...postValidators, postsControllers.updatePostController)

