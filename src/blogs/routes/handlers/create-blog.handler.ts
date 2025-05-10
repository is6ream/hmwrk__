import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util';
import { blogsService } from '../../application/dtos/dtos/blogs.service';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { BlogCreateInput } from '../input/blog-create.input';



const createBlogHandler = (async (req: Request, res: Response) => {
    const createBlog = await blogsService.createBlog(req.body)
    res.status(HttpStatus.Created).json(createBlog)
})