import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsService } from '../../application/dtos/dtos/blogs.service';
import { Blog } from '../../domain/blog';
import { mapToBlogOutput } from '../mappers/map-to-blog-list-paginated-otput';
import { errorsHandler } from '../../../core/errors/errors.handler';


export type BlogsAttributes = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export enum ResourceType {
    Blogs = 'blogs',
    Posts = 'posts'
}

export type BlogCreateInput = {
    data: {
        type: ResourceType.Blogs;
        attributes: BlogsAttributes
    }
}



export async function createBlogHandler(
    req: Request<{}, {}, BlogCreateInput>,
    res: Response,
) {
    try {
        const createBlogId = await blogsService.createBlog(
            req.body.data.attributes,
        )
        const createdBlog = await blogsService.findById(createBlogId) //Нужно реализовать этот метод
        const blogOutput = mapToBlogOutput(createdBlog!)
        res.status(HttpStatus.Created).send(blogOutput)
    } catch (e: unknown) {
        errorsHandler(e, res)
    }
} //Закончил с реализацией этой ветки

