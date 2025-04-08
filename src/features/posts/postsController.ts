// import { db } from './../../db/db';
import { Request, Response } from "express";
import { postRepository } from './postsRepository';

export const postsControllers = {
    // deleteAllDataController: ((req: Request, res: Response) => {
    //     db.blogs = [];
    //     res.status(204).send()
    // }),

    getPostController: (async (req: Request, res: Response) => {
        const getAllPosts = await postRepository.getAll()
        res.status(200).json(getAllPosts)
    }),

    createPostController: (async (req: Request, res: Response) => {
        const createdPost = await postRepository.createPost(req.body)
        res.status(201).json(createdPost)
    }),

    findPostController: (async (req: Request, res: Response) => {
        const findedPost = await postRepository.findPost(req.params.id)
        res.json(findedPost)
    }),

    updatePostController: (async (req: Request, res: Response) => {
        const updatedPost = await postRepository.updatePost(req.params.id, req.body)
        res.status(204).send()
    }),

    deletePostController: (async (req: Request, res: Response) => {
        const deletedPost = await postRepository.delete(req.params.id)
        res.status(204).send()
    })
}