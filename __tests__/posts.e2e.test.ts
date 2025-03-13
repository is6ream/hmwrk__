import { db, setDB } from '../src/db/db'
import { SETTINGS } from '../src/settings'
import { codedAuth, createString, dataset1, dataset2 } from './helpers/datasets'
import { PostInputModel } from '../src/input-output-types/blogsAndPost-types'
import { req } from './helpers/test-helpers'
import { error } from 'console'

describe('/posts', () => {
    beforeAll(async () => {
        setDB()
    })

    it('should create', async () => { //1
        setDB(dataset1)
        const newPost: PostInputModel = {
            title: 't1',
            shortDescription: 's1',
            content: 'c1',
            blogId: dataset1.blogs[0].id,
        }

        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(newPost)
            .expect(201)

        // console.log(res.body)

        expect(res.body.title).toEqual(newPost.title)
        expect(res.body.shortDescription).toEqual(newPost.shortDescription)
        expect(res.body.content).toEqual(newPost.content)
        expect(res.body.blogId).toEqual(newPost.blogId)
        expect(typeof res.body.id).toEqual('string')

        expect(res.body).toEqual(db.posts[0]) //возможно новая сущность в БД будет не первой а второй
    })

    it('shouldn\'t create 401', async () => { //2
        setDB(dataset1)
        const newPost: PostInputModel = {
            title: 't1',
            shortDescription: 's1',
            content: 'c1',
            blogId: dataset1.blogs[0].id,
        }

        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .send(newPost)
            .expect(401)

        // console.log(res.body)
        expect(db.posts.length).toEqual(0)
    })

    it('shouldn\'t create', async () => { //3
        setDB()
        const newPost: PostInputModel = {
            title: createString(31),
            content: createString(1001),
            shortDescription: createString(101),
            blogId: '1'
        }

        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(newPost)
            .expect(400)

        expect(res.body.errorsMessages.length).toEqual(4)
        expect(res.body.errorsMessages[0].field).toEqual('title')
        expect(res.body.errorsMessages[1].field).toEqual('shortDescription')
        expect(res.body.errorsMessages[2].field).toEqual('content')
        expect(res.body.errorsMessages[3].field).toEqual('blogId')

        expect(db.posts.length).toEqual(0)
    })

    it('should get empty array', async () => { //4
        setDB()

        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200)

        expect(res.body.length).toEqual(0)
    })

    it('should get not empty array', async () => { //5
        setDB(dataset2)

        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200)

        expect(res.body[0]).toEqual(dataset2.posts[0]) //возможно db.posts?
    })

    it('shouldn\'t find', async () => { //6
        setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.POSTS + '/1')
            .expect(404)
    })

    it('should find', async () => { //7
        setDB(dataset2)

        const res = await req
            .get(SETTINGS.PATH.POSTS + '/' + dataset2.posts[0].id)
            .expect(200)

        expect(res.body).toEqual(dataset2.posts[0]) //не может найти в бд
    })

    it('should del', async () => { //8
        setDB(dataset2)

        const res = await req
            .delete(SETTINGS.PATH.POSTS + '/' + dataset2.posts[0].id) //здесь показывает что undefined
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .expect(204)

            expect(db.posts.length).toEqual(0)
        }) //////тут надо с ментором разобрать

    it('shouldn\'t del', async () => { //9
        setDB()

        const res = await req
            .delete(SETTINGS.PATH.POSTS + '/5') //изменил 1 на 5
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .expect(404)

        // console.log(res.body)
    })

    it('shouldn\'t del 401', async () => { //10
        setDB(dataset2)

        const res = await req
            .delete(SETTINGS.PATH.POSTS + dataset2.posts[0].id) //тут аналогичная ситуация
            .set({ 'Authorization': 'Basic' + codedAuth }) //no ' '
            .expect(401)
    })

    it('should update', async () => { //11
        setDB(dataset2)

        const post: PostInputModel = {
            title: 't1',
            shortDescription: 's1',
            content: 'c1',
            blogId: dataset2.blogs[0].id
        }

        const res = await req
            .put(SETTINGS.PATH.POSTS + '/' + dataset2.posts[0].id)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(post)
            .expect(204)

        // expect(res.body).toEqual({ ...db.posts[0], ...post, blogId: dataset2.blogs[0].id }) //вот зедсь непонятно
        //тут не понял как работает последняя строка

    })

    it('shouldn\t update 404', async () => { //12
        setDB(dataset2)

        const post: PostInputModel = {
            title: 't1',
            shortDescription: 's1',
            content: 'c1',
            blogId: '1'
        }

        const res = await req
            .put(SETTINGS.PATH.POSTS + '/1') //объект в бд не найден по id
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(post)
            .expect(404)
    })

    it('shouldn\t update2', async () => { //13
        setDB(dataset2)

        const post: PostInputModel = {
            title: createString(31),
            shortDescription: createString(101),
            content: createString(1001),
            blogId: '1'
        }

        const res = await req
            .put(SETTINGS.PATH.POSTS + '/' + dataset2.posts[0].id)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(post)
            .expect(400)

        expect(db).toEqual(dataset2)
        expect(res.body.errorsMessages.length).toEqual(4)
        expect(res.body.errorsMessages[0].field).toEqual('title')
        expect(res.body.errorsMessages[1].field).toEqual('shortDescription')
        expect(res.body.errorsMessages[2].field).toEqual('content')
        expect(res.body.errorsMessages[3].field).toEqual('blogId')
    })

    it('shouldn\t update 401', async () => { //14
        setDB(dataset2)

        const post: PostInputModel = {
            title: createString(31),
            shortDescription: createString(101),
            content: createString(1001),
            blogId: '1'
        }

        const res = await req
            .put(SETTINGS.PATH.POSTS + '/' + dataset2.posts[0].id)
            .set({ 'Authorization': 'Basic ' + codedAuth + 'error' })
            .send(post)
            .expect(401)

        expect(db).toEqual(dataset2)
    })
})