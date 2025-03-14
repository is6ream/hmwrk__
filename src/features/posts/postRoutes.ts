import { Router } from "express";
import { postsControllers } from "../posts/postsController";
import { findPostValidator, postValidators } from "./middlewares/postValidators";
import { adminMiddleware } from "../../global-middlewares/admin-middleware";
import { findBlogValidator } from "../blogs/middlewares/blogValidators";


export const postsRouter = Router()

postsRouter.get('/posts', postsControllers.getPostController)
postsRouter.post('/posts', ...postValidators, postsControllers.createPostController)
postsRouter.get('/posts/:id', findPostValidator, postsControllers.findPostController)
postsRouter.delete('/testing/all-data', ...postValidators, postsControllers.deleteAllDataController) //на всякий случай подключил
postsRouter.delete('/posts/:id', adminMiddleware, findBlogValidator, postsControllers.deletePostController)
postsRouter.put('/posts/:id', findPostValidator, ...postValidators, postsControllers.updatePostController)

