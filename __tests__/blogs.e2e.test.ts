import { req } from './helpers/test-helpers'
import { SETTINGS } from '../src/settings'
import { BlogInputModel } from '../src/input-output-types/blogsAndPost-types'
import { codedAuth, createString, dataset1 } from './helpers/datasets'
import { blogCollection, clearDatabase, runDB } from '../src/db/mongo'
import { blogsRepository } from '../src/features/blogs/blogsRepository'
import { get } from 'http'


describe('/blogs', () => {
    //создаем переменную для хранения id блога
    let createdBlogId: string | undefined
    beforeAll(async () => {
        await runDB(process.env.MONGO_URL || 'mongodb://localhost:27017/test_db')
    })

    it('should create new blog', async () => { //1
        clearDatabase()
        console.log("База данных очищена")
        const newBlog: BlogInputModel = {
            name: "n1",
            description: "d1",
            websiteUrl: "http://jam.com"
        }
        console.log("Входящие данные:", newBlog)
        const createdBlog = await blogsRepository.create(newBlog);
        console.log("Созданный блог:", createdBlog)
        createdBlogId = createdBlog.id


        expect(createdBlog).toHaveProperty('id');
        expect(createdBlog.name).toBe(newBlog.name);
        expect(createdBlog.description).toBe(newBlog.description);
        expect(createdBlog.websiteUrl).toBe(newBlog.websiteUrl);
    }),

        it('should get created blog', async () => {
            const getAllBlogs = await blogsRepository.getAll();
            expect(getAllBlogs).toEqual([
                {
                    id: createdBlogId,
                    name: "n1",
                    description: "d1",
                    websiteUrl: "http://jam.com",
                    createdAt: expect.any(String),
                    isMembership: expect.any(Boolean)
                }
            ])
        }),

        it('should delete created blog', async () => {
            const deletedBlog = await blogsRepository.delete(createdBlogId);
            expect(deletedBlog.deletedCount).toBe(1)

            const remainingBlogs = await blogCollection.find({}).toArray();
            expect(remainingBlogs).toEqual([])
        })
})

