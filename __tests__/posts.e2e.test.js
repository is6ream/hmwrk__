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
const postsRepository_1 = require("./../src/features/posts/postsRepository");
const mongo_1 = require("../src/db/mongo");
const blogsRepository_1 = require("../src/features/blogs/blogsRepository");
describe('/posts', () => {
    let createdBlogId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongo_1.runDB)(process.env.MONGO_URL || 'mongodb://localhost:27017/test-db');
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongo_1.clearDatabase)();
        //создаем блог для тестов 
        const newBlog = {
            name: 'n1',
            description: 'd1',
            webSiteUrl: 'http://chicky.com'
        };
        const createdBlog = yield blogsRepository_1.blogsRepository.createBlog(newBlog);
        createdBlogId = createdBlog.id; //сохраняем id созданного блога
    }));
    it('should return empty array when no post exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const getAllPosts = yield postsRepository_1.postRepository.findAll();
        expect(getAllPosts).toEqual([]);
    })),
        it('should return post after creating', () => __awaiter(void 0, void 0, void 0, function* () {
            const newPost = {
                title: 't1',
                shortDescription: 's1',
                content: 'c1',
                blogId: createdBlogId
            };
            const createPost = yield postsRepository_1.postRepository.create(newPost);
            const findCreatedPost = yield postsRepository_1.postRepository.findById(createPost.id);
            expect(createPost).toEqual(findCreatedPost);
        }));
});
