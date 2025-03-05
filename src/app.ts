import express from 'express'
import cors from 'cors'
import { blogsRouter } from './blogs/blogsRoutes'
import { postsRouter } from './posts/postRoutes'

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк



app.use('/hometask_02/api/', blogsRouter, postsRouter); 

