import { db, setDB } from './../src/db/db'
import { SETTINGS } from '../src/settings'
import { codedAuth, createString, dataset1, dataset2 } from './helpers/datasets'
import { PostInputModel } from '../src/input-output-types/blogsAndPost-types'
import {req} from './helpers/test-helpers'
import { create } from 'domain'

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

    it('shouldn\t create 401', async() => {
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

    it('shouldn\t create', async() => {
        setDB()
        const newPost: PostInputModel = {
            title: createString(31),
            content: createString(1001),
            shortDescription: createString(101),
            blogId: '1'
        }

        const res = await req
        .post(SETTINGS.PATH.POSTS)
        .set({'Authorization': 'Basic ' + codedAuth})
        .send(newPost)
        .expect(400)

        expect(res.body.errorsMessages.length).toEqual(4)
        expect(res.body.errorsMessages[0].field).toEqual('title')
        expect(res.body.errorsMessages[1].field).toEqual('content')
        expect(res.body.errorsMessages[2].field).toEqual('shortDescription')
        expect(res.body.errorsMessages[3].field).toEqual('blogId')

        expect(db.posts.length).toEqual(0)
    })

    it('should get empty array')
})