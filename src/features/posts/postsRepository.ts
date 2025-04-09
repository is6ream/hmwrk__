import { PostInputModel } from "../../input-output-types/blogsAndPost-types";
import { blogsRepository } from "../blogs/blogsRepository";
import { PostDBType } from "../../input-output-types/blogsAndPost-types";
import { ObjectId } from "mongodb";
import { blogCollection, postCollection } from "../../db/mongo";



export const postRepository = {
    async getAll() {
        return postCollection.find().toArray()
    },

    async createPost(post: PostInputModel): Promise<PostDBType> {
        //достаем блог по id, переданному в боди поста

        const blog = await blogsRepository.find(post.blogId);
        if (!blog) {
            throw new Error('Blog not found')
        }
        const newPost: PostInputModel = {
            id: new ObjectId().toString(), //остановился тут
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: blog?.name,
            createdAt: new Date().toISOString(),
        }

        const result = await postCollection.insertOne(newPost);
        return newPost
    },

    async findPost(id: string | undefined): Promise<PostDBType | null> {
        if (!id || !ObjectId.isValid(id)) {
            return null
        }
        try {
            const findPost = await postCollection.findOne({ _id: new ObjectId(id) })
            return findPost || null
        } catch (error) {
            console.log('Error finding post:', error)
            return null
        }
    },
    async updatePost(id: string, updatedPost: PostInputModel): Promise<Boolean | null> {
        if (!ObjectId.isValid(id)) {
            console.log("Invalid objectId: ", id);
            return null
        }
        const result = await postCollection.updateOne({ _id: new ObjectId(id) }, { $set: { updatedPost: updatedPost } });
        return result.matchedCount === 1;
    },

    async delete(id: string) {
        const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });
        return result
    }
}
