import { Router } from "express";
import { blogsControllers } from './blogsControllers';
import { blogValidators, findBlogValidator } from "./middlewares/blogValidators";
import { adminMiddleware } from "../../global-middlewares/admin-middleware";

export const blogsRouter = Router()

blogsRouter.get('/blogs', blogsControllers.getBlogsController)
blogsRouter.post('/blogs', ...blogValidators, blogsControllers.createBlogController)
blogsRouter.get('/blogs/:id', findBlogValidator, blogsControllers.findBlogConstroller)
blogsRouter.delete('/testing/all-data', blogsControllers.deleteAllDataController)
blogsRouter.delete('/blogs/:id', adminMiddleware, blogsControllers.deleteBlogControler)
blogsRouter.put('/blogs/:id', findBlogValidator, ...blogValidators, blogsControllers.updateBlogController)