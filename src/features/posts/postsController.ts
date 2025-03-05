import { db } from './../../db/db';
import { Request, Response } from "express";

export const postsControllers = {
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
            blogName: 'top',
        }

        db.blogs.push(newPost)
        console.log(newPost)
        res.status(201).json(newPost)
    }),

    findPostController: ((req: Request, res: Response) => {
        const postId: number = +req.params.id;
        const findPost = db.posts.find(p => +p.id === postId)
        if(!findPost){
            res
            .status(404)
            .json({message: "Пост не найден"})
        }
        res.json(findPost)
    }),

    updatePostController: ((req: Request, res: Response) => {
        const postId = +req.params.id;
        const findPost = db.posts.find(p => +p.id === postId)

        if(!findPost){
           return res
            .status(404)
            .json({message: 'Пост не найден'})
        }

        findPost.title = req.body.title || findPost.title
        findPost.shortDescription = req.body.shortDescription || findPost.shortDescription
        findPost.content = req.body.content || findPost.content
        findPost.blogId = req.body.blogId || findPost.blogId      

        return res.status(204).send()
    }),

    deletePostController: ((req: Request, res: Response) => {
        const postId = +req.params.id;
        const findPost = db.posts.find(p => +p.id === postId)

        if(!findPost){
            res
            .status(404)
            .json({message: 'Пост не найден'})
        }

        db.posts.filter(p => +p.id !== postId)
        res.status(204).send()
    })
}