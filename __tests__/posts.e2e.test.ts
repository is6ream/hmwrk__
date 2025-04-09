// import { postRepository } from './../src/features/posts/postsRepository';
// import { BlogInputModel, PostInputModel } from "../src/input-output-types/blogsAndPost-types";
// import { postCollection, clearDatabase, runDB } from "../src/db/mongo";
// import { blogsRepository } from '../src/features/blogs/blogsRepository';



// describe('/posts', async () => {
//     //создание переменной для хранения id поста
//     let createdPostId: string | undefined;
//     let createdBlogId: string | undefined;
//     beforeAll(async () => {
//         await runDB(process.env.MONGO_URL || 'mongodb://localhost:27017/test_db');
//     })
//     beforeEach(async () => {
//         await clearDatabase();
//     })

//     const newBlog: BlogInputModel = {
//         name: "testBlog",
//         description: "testDescription",
//         webSiteUrl: "http://slam.com"
//     }

//     const createdBlog = await blogsRepository.create(newBlog);
//     createdBlogId = createdBlog.id;

//     it("should create one post", async () => {
//         const newPost: PostInputModel = {
//             title: "t1",
//             shortDescription: "sd1",
//             content: "c1",
//             blogId: createdBlog.id
//         }

//         const createdPost = await postRepository.createPost(newPost);
//         createdPostId = createdPost.id
//         const findPost = await postRepository.findPost(createdPostId)
//         expect(createdPost).toEqual(findPost)
//     })
// })