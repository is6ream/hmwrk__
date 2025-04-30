import { BlogInputModel } from "../../../input-output-types/blogsAndPost-types";
import { Request, Response } from "express";
import { blogsRepository } from '../../repositories/blogsRepository';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util';

export async function createBlogHandler(
    req: Request<{}, {}, BlogInputModel>,
    res: Response
) {
    try {
        const newBlog: BlogInputModel = {
            id: new Date().toISOString(),
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: true
        }

        const createdBlog = await blogsRepository.createBlog(newBlog)
        const blogViewModel = mapToBlogViewModel(createdBlog);
        res.status(201).send(blogViewModel)
    }

    catch (e: unknown) {
        res.sendStatus(500)
    }
}  ///Закончить работу над хендлером