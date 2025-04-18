import { Express } from "express";
import { SETTINGS } from "./settings";
import { blogsRouter } from "./features/blogs/blogsRoutes";
import { postsRouter } from "./features/posts/postRoutes";
import express from 'express';
import { testingRouter } from "./testing/routes/testing.route";

export const setupApp = async (app: Express) => {

    //мидлв для парсинга объектов
    app.use(express.json());
    
    app.get('/', (req, res) => {
        res.status(200).send('Hello world!')
    })
    //регистрация роутов
    app.use(SETTINGS.PATH.BLOGS, blogsRouter);
    app.use(SETTINGS.PATH.POSTS, postsRouter);
    app.use(SETTINGS.PATH.TEST, testingRouter);

    return app;
};


