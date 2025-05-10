import { Router } from "express";
import { blogValidators, findBlogValidator } from "../middlewares/blogValidators";
import { adminMiddleware } from "../../global-middlewares/admin-middleware";
import { getAllBlogsHandler } from "./handlers/getAll-blogs.handler";
import { createBlogHandler } from "./handlers/create-blog.handler";
import { findBlogHandler } from "./handlers/find-blog.handler";
import { deleteBlogHandler } from "./handlers/delete-blog.handler";
import { updateBlogHandler } from "./handlers/update-blog.handler";

export const blogsRouter = Router()

blogsRouter.get('/blogs', getAllBlogsHandler)
blogsRouter.post('/blogs', ...blogValidators, createBlogHandler)
blogsRouter.get('/blogs/:id', findBlogValidator, findBlogHandler)
blogsRouter.delete('/blogs/:id', adminMiddleware, findBlogValidator, deleteBlogHandler)
blogsRouter.put('/blogs/:id', findBlogValidator, ...blogValidators, updateBlogHandler)

