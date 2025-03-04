import { Request, Response } from "express";
import { db } from "../db/db";

export const postsController = {
    deleteAllDataController: ((req: Request, res: Response) => {
        db.blogs = [];
        res.status(204).send()
    }),

    getPostController: ((req: Request, res: Response) => {
        const posts = db.posts
        res
        .status(200)
        .json(posts)
    }),

    createPostController: ((req: Request, res: Response) => {
        const postId = Date.now() + Math.random()
        const newPost = {
            ...req.body,

            id: postId.toString,
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
            blogName: , //остановился тут, надо понять, откуда взять blogName



        }
    })
}