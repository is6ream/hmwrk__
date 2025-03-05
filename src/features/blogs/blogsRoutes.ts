import { Router } from "express";
import { blogsControllers } from './blogsControllers';

export const blogsRouter = Router()

blogsRouter.get('/blogs', blogsControllers.getBlogsController)
blogsRouter.post('/blogs', blogsControllers.createBlogController)
blogsRouter.get('/blogs/:id', blogsControllers.findBlogConstroller)
blogsRouter.delete('/testing/all-data', blogsControllers.deleteAllDataController)
blogsRouter.delete('/blogs/:id', blogsControllers.deleteBlogControler)
blogsRouter.put('/blogs/:id', blogsControllers.deleteBlogControler)