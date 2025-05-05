import { Router } from "express";
import { blogsControllers } from '../blogsControllers';
import { blogValidators, findBlogValidator } from "../middlewares/blogValidators";
import { adminMiddleware } from "../../global-middlewares/admin-middleware";

export const blogsRouter = Router()

//Здесь будет вестись работа над пагинацией, сортингом и bll

blogsRouter.get('/blogs', blogsControllers.getBlogsController)
blogsRouter.post('/blogs', ...blogValidators, blogsControllers.createBlogController)
blogsRouter.get('/blogs/:id', findBlogValidator, blogsControllers.findBlogConstroller)
blogsRouter.delete('/blogs/:id', adminMiddleware, findBlogValidator, blogsControllers.deleteBlogController)
blogsRouter.put('/blogs/:id', findBlogValidator, ...blogValidators, blogsControllers.updateBlogController)



