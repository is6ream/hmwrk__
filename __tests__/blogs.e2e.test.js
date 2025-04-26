"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogsRepository_1 = require("./../src/features/blogs/blogsRepository");
const mongo_1 = require("../src/db/mongo");
describe('/blogs', () => {
    //создаем переменную для хранения id блога
    let createdBlogId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongo_1.runDB)(process.env.MONGO_URL || 'mongodb://localhost:27017/test_db');
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongo_1.clearDatabase)();
    }));
    it('should return empty array when no blog exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const getAllBlogs = yield blogsRepository_1.blogsRepository.findAll();
        expect(getAllBlogs).toEqual([]);
    })),
        it('should return all blogs after creation', () => __awaiter(void 0, void 0, void 0, function* () {
            //создаем тестовый блог
            const newBlog = {
                name: 'Test blog',
                description: 'Test description',
                webSiteUrl: 'https://habr.com/ru/articles'
            };
            const createBlog = yield blogsRepository_1.blogsRepository.createBlog(newBlog);
            const getAllBlogs = yield blogsRepository_1.blogsRepository.findAll();
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
            ]);
            expect(getAllBlogs).toHaveLength(1);
        })),
        it('should create new blog', () => __awaiter(void 0, void 0, void 0, function* () {
            //создаем новый блог
            const newBlog = {
                name: 'New blog',
                description: 'New description',
                webSiteUrl: 'https://translate.google.com/?hl=ru'
            };
            const createBlog = yield blogsRepository_1.blogsRepository.createBlog(newBlog);
            const getCreatedBlog = yield blogsRepository_1.blogsRepository.findById(createBlog._id.toString());
            expect(getCreatedBlog).toEqual({
                _id: expect.any(Object),
                id: expect.any(String),
                name: newBlog.name,
                description: newBlog.description,
                webSiteUrl: newBlog.webSiteUrl,
                createdAt: expect.any(String),
                isMembership: expect.any(Boolean)
            });
        })),
        it('should update blog, after creating', () => __awaiter(void 0, void 0, void 0, function* () {
            const newBlog = {
                name: 'New Blog',
                description: 'New description',
                webSiteUrl: 'https://learn.javascript.ru/'
            };
            const createBlog = yield blogsRepository_1.blogsRepository.createBlog(newBlog);
            const updateBlog = yield blogsRepository_1.blogsRepository.updateBlog(createBlog._id.toString(), {
                name: 'updated',
                description: 'updated',
                webSiteUrl: 'http://slamick.com'
            });
            expect(updateBlog).toEqual(true);
        })),
        it('should delete blog after creating', () => __awaiter(void 0, void 0, void 0, function* () {
            const newBlog = {
                name: 'Blog for deleting',
                description: 'Description',
                webSiteUrl: 'http://ari.com'
            };
            const createBlog = yield blogsRepository_1.blogsRepository.createBlog(newBlog);
            const deleteBlog = yield blogsRepository_1.blogsRepository.delete(createBlog._id.toString());
            const findBlog = yield blogsRepository_1.blogsRepository.findById(createBlog._id.toString());
            expect(findBlog).toEqual(null);
        }));
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
});
