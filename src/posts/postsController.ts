// import { db } from './../../db/db';
import { Request, Response } from "express";
import { postRepository } from './postsRepository';
import { HttpStatus } from "../../core/http-statuses";

export const postsControllers = {
    deleteAllDataController: (async (req: Request, res: Response) => {
      const deletedAllData = await postRepository.deleteAll();
      res.sendStatus(HttpStatus.NoContent)
    }),

    getPostController: (async (req: Request, res: Response) => {
        const getAllPosts = await postRepository.findAll()
        res.status(200).json(getAllPosts)
    }),

    createPostController: (async (req: Request, res: Response) => {
        const createdPost = await postRepository.create(req.body)
        res.status(201).json(createdPost)
    }),

    findPostController: (async (req: Request, res: Response) => {
        const findedPost = await postRepository.findById(req.params.id)
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