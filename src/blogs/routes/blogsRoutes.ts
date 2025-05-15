import { Router } from "express";
import { blogValidators, findBlogValidator, idValidation } from "../middlewares/blogValidators";
import { adminMiddleware } from "../../global-middlewares/admin-middleware";
import { getAllBlogsHandler } from "./handlers/getAll-blogs.handler";
import { createBlogHandler } from "./handlers/create-blog.handler";
import { findBlogHandler } from "./handlers/find-blog.handler";
import { deleteBlogHandler } from "./handlers/delete-blog.handler";
import { updateBlogHandler } from "./handlers/update-blog.handler";
import { paginationAndSortingValidation } from "../../core/middlewares/validation/pagination-and-sorting-validation";
import { BlogSortField } from "./input/blog-sort-field";

export const blogsRouter = Router()

blogsRouter.get('/blogs', paginationAndSortingValidation(BlogSortField), getAllBlogsHandler) /*суть валидации и пагинации заключается во избежание SQL-инъекций 
и в целом повышением уровня безопасности и стабилизации приложения*/ 
blogsRouter.post('/blogs', ...blogValidators, createBlogHandler)
blogsRouter.get('/blogs/:id/posts', idValidation) //здесь остановился, нужно прописать валидацию
blogsRouter.get('/blogs/:id', findBlogValidator, findBlogHandler)
blogsRouter.delete('/blogs/:id', adminMiddleware, findBlogValidator, deleteBlogHandler)
blogsRouter.put('/blogs/:id', findBlogValidator, ...blogValidators, updateBlogHandler)

