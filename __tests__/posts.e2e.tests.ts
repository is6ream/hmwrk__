import { db, setDB } from './../src/db/db'
import { SETTINGS } from '../src/settings'
import { codedAuth, createString, dataset1, dataset2 } from './helpers/datasets'
import { PostInputModel } from '../src/input-output-types/blogsAndPost-types'
import { req } from './helpers/test-helpers'
import { create } from 'domain'
import exp from 'constants'

describe('/posts', () => {
    beforeAll(async () => {
        setDB()
    })

    it('should create', async () => {
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

        expect(res.body).toEqual(db.posts[0])
    })

    it('shouldn\'t create 401', async () => {
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
            .expect(201)

        // console.log(res.body)
        expect(db.posts.length).toEqual(0)
    })

    it('shouldn\'t create', async () => {
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
        expect(res.body.errorsMessages[1].field).toEqual('content')
        expect(res.body.errorsMessages[2].field).toEqual('shortDescription')
        expect(res.body.errorsMessages[3].field).toEqual('blogId')

        expect(db.posts.length).toEqual(0)
    })

    it('should get empty array', async () => {
        setDB()

        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200)

        expect(res.body.length).toEqual(0)
    })

    it('should get not empty array', async() => {
        setDB(dataset2)

        const res = await req
        .get(SETTINGS.PATH.POSTS)
        .expect(200)

        expect(res.body[0]).toEqual(dataset2.posts[0])
    })

    it('shouldn\'t find', async() => {
        setDB(dataset1)

        const res = await req
        .get(SETTINGS.PATH.POSTS + '/1') 
        .expect(404)
    })

    it('should find', async() => {
        setDB(dataset2)

        const res = await req
        .get(SETTINGS.PATH.POSTS + dataset2.posts[0].id)
        .expect(200)

        expect(res.body).toEqual(dataset2.posts[0])
    })

    it('should del', async() => {
        setDB(dataset1)

        const res = await req
        .delete(SETTINGS.PATH.POSTS + dataset1.posts[0].id)
        .set({'Authorization': 'Basic ' + codedAuth})
        .expect(204)
    })

    it('shouldn\'t del', async() => {
        setDB(dataset1)

        const res = await req
        .delete(SETTINGS.PATH.POSTS + '/1')
        .set({'Authorization': 'Basic ' + codedAuth})
        .expect(404)
    })

    it('shouldn\'t del 401', async() => {
        setDB(dataset1)

        const res = await req
        .delete(SETTINGS.PATH.POSTS + dataset1.posts[0].id)
        .set({'Authorization': 'Basic' + codedAuth}) //no ' '
        .expect(401)
    })


})