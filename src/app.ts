import express from 'express'
import cors from 'cors'
import { blogsRouter } from './features/blogs/blogsRoutes'
import { postsRouter } from './features/posts/postRoutes'
import { db } from './db/db'

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк



app.use('/hometask_02/api/', blogsRouter, postsRouter); 
//пока не разобрался с эндпоинт, который удалят все данные