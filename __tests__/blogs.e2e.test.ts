import { blogsRepository } from './../src/features/blogs/blogsRepository';
import { BlogInputModel } from '../src/input-output-types/blogsAndPost-types'
import { blogCollection, clearDatabase, runDB } from '../src/db/mongo'

describe('/blogs', () => {
    //создаем переменную для хранения id блога
    let createdBlogId: string | undefined
    beforeAll(async () => {
        await runDB(process.env.MONGO_URL || 'mongodb://localhost:27017/test_db')
    });
    beforeEach(async () => {
        await clearDatabase();
    })

    it('should return empty array when no blog exist', async () => {
        const getAllBlogs = await blogsRepository.findAll();
        expect(getAllBlogs).toEqual([])
    }),

        it('should return all blogs after creation', async () => {
            //создаем тестовый блог
            const newBlog: BlogInputModel = {
                name: 'Test blog',
                description: 'Test description',
                webSiteUrl: 'https://habr.com/ru/articles'
            }
            const createBlog = await blogsRepository.createBlog(newBlog)
            const getAllBlogs = await blogsRepository.findAll();

            expect(getAllBlogs).toEqual([
                {
                    _id: expect.any(Object),
                    id: expect.any(String),
                    name: newBlog.name,
                    description: newBlog.description,
                    webSiteUrl: newBlog.webSiteUrl,
                    createdAt: expect.any(String),
                    isMembership: expect.any(Boolean)
                }
            ])
            expect(getAllBlogs).toHaveLength(1)
        }),

        it('should create new blog', async () => {
            //создаем новый блог
            const newBlog: BlogInputModel = {
                name: 'New blog',
                description: 'New description',
                webSiteUrl: 'https://translate.google.com/?hl=ru'
            }
            const createBlog = await blogsRepository.createBlog(newBlog);
            const getCreatedBlog = await blogsRepository.findById(createBlog._id.toString());
            expect(getCreatedBlog).toEqual(
                {
                    _id: expect.any(Object),
                    id: expect.any(String),
                    name: newBlog.name,
                    description: newBlog.description,
                    webSiteUrl: newBlog.webSiteUrl,
                    createdAt: expect.any(String),
                    isMembership: expect.any(Boolean)
                }
            )
        }),
        it('should update blog, after creating', async () => {
            const newBlog: BlogInputModel = {
                name: 'New Blog',
                description: 'New description',
                webSiteUrl: 'https://learn.javascript.ru/'
            }
            const createBlog = await blogsRepository.createBlog(newBlog);
            const updateBlog = await blogsRepository.updateBlog(createBlog._id.toString(), {
                name: 'updated',
                description: 'updated',
                webSiteUrl: 'http://slamick.com'
            })
            expect(updateBlog).toEqual(true)
        }),
        it('should delete blog after creating', async () => {
            const newBlog: BlogInputModel = {
                name: 'Blog for deleting',
                description: 'Description',
                webSiteUrl: 'http://ari.com'
            }
            const createBlog = await blogsRepository.createBlog(newBlog);
            const deleteBlog = await blogsRepository.delete(createBlog._id.toString());
            const findBlog = await blogsRepository.findById(createBlog._id.toString());
            expect(findBlog).toEqual(null)
        })
    //дописал тест на обнолвение данных в бд

    // ,


    // it('should create new blog', async () => { //1
    //     clearDatabase()
    //     console.log("База данных очищена")
    //     const newBlog: BlogInputModel = {
    //         name: "n1",
    //         description: "d1",
    //         webSiteUrl: "http://jam.com"
    //     }
    //     console.log("Входящие данные:", newBlog)
    //     const createdBlog = await blogsRepository.createBlog(newBlog);
    //     console.log("Созданный блог:", createdBlog)
    //     createdBlogId = createdBlog.id


    //     expect(createdBlog).toHaveProperty('id');
    //     expect(createdBlog.name).toBe(newBlog.name);
    //     expect(createdBlog.description).toBe(newBlog.description);
    //     expect(createdBlog.webSiteUrl).toBe(newBlog.webSiteUrl);
    // }),

    //     it('should get created blog', async () => {
    //         const getAllBlogs = await blogsRepository.findAll();
    //         expect(getAllBlogs).toEqual([
    //             {
    //                 id: createdBlogId,
    //                 name: "n1",
    //                 description: "d1",
    //                 websiteUrl: "http://jam.com",
    //                 createdAt: expect.any(String),
    //                 isMembership: expect.any(Boolean)
    //             }
    //         ])
    //     }),

    //     it('should update created blog', async () => {
    //         const updatedBlog = await blogsRepository.updateBlog(createdBlogId, {
    //             name: 'kkk',
    //             description: 'sss',
    //             webSiteUrl: 'https://www.youtube.com/'
    //         })
    //         const findBlog = await blogsRepository.findById(createdBlogId)
    //         expect(updatedBlog).toEqual(true)
    //     })

    // it('should delete created blog', async () => {
    //     const deletedBlog = await blogsRepository.delete(createdBlogId);
    //     expect(deletedBlog.deletedCount).toBe(1)

    //     const remainingBlogs = await blogCollection.find({}).toArray();
    //     expect(remainingBlogs).toEqual([])
    // })

})

