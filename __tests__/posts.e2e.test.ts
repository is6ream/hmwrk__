import { postRepository } from './../src/features/posts/postsRepository';
import { BlogInputModel, PostInputModel } from "../src/input-output-types/blogsAndPost-types";
import { postCollection, clearDatabase, runDB } from "../src/db/mongo";
import { blogsRepository } from '../src/features/blogs/blogsRepository';
import { execPath } from 'process';


describe('/posts', () => {
    let createdBlogId: string;
    beforeAll(async () => {
        await runDB(process.env.MONGO_URL || 'mongodb://localhost:27017/test-db')
    });
    beforeEach(async () => {
        await clearDatabase()
        //создаем блог для тестов 
        const newBlog: BlogInputModel = {
            name: 'n1',
            description: 'd1',
            webSiteUrl: 'http://chicky.com'
        }
        const createdBlog = await blogsRepository.createBlog(newBlog);
        createdBlogId = createdBlog.id; //сохраняем id созданного блога
    })
    it('should return empty array when no post exist', async () => {
        const getAllPosts = await postRepository.findAll();
        expect(getAllPosts).toEqual([])
    }),

        it('should return post after creating', async () => {
            const newPost: PostInputModel = {
                title: 't1',
                shortDescription: 's1',
                content: 'c1',
                blogId: createdBlogId
            };
            const createPost = await postRepository.create(newPost);
            const findCreatedPost = await postRepository.findById(createPost.id);
            expect(createPost).toEqual(findCreatedPost);
        })

})