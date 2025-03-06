import { db } from './../../db/db';
import { Request, Response } from "express";
import { postRepository } from './postsRepository';

export const postsControllers = {
    deleteAllDataController: ((req: Request, res: Response) => {
        db.blogs = [];
        res.status(204).send()
    }),

    getPostController: ((req: Request, res: Response) => {
        const getAllPosts = postRepository.getAll()
        res.status(200).json(getAllPosts)
    }),

    createPostController: ((req: Request, res: Response) => {
        const createdPost = postRepository.createPost(req.body)
        res.status(201).json(createdPost)
    }),

    findPostController: ((req: Request, res: Response) => {
        const findedPost = postRepository.findPost(req.params.id)
        res.json(findedPost)
    }),

    updatePostController: ((req: Request, res: Response) => {
        const updatedPost = postRepository.updatePost(req.params.id, req.body)
        res.status(204).send()
    }),

    deletePostController: ((req: Request, res: Response) => {
        const deletedPost = postRepository.delete(req.params.id)
        res.status(204).send()
    })
}