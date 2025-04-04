import { Express } from "express";
import { SETTINGS } from "./settings";
import { blogsRouter } from "./features/blogs/blogsRoutes";
import { postsRouter } from "./features/posts/postRoutes";
import { runDB } from "./db/mongo";
import express from 'express'


export const setupApp = async (app: Express) => {
    app.use(express.json());

    // подключение БД
    if(!process.env.MONGO_URL){
        
    }
    await runDB(SETTINGS.MONGO_URL);

    app.use(SETTINGS.PATH.BLOGS, blogsRouter);
    app.use(SETTINGS.PATH.POSTS, postsRouter);

    return app;
};