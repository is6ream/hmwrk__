import { PostInputModel } from "../../input-output-types/blogsAndPost-types";
import { blogsRepository } from "../blogs/blogsRepository";
import { PostDBType } from "../../db/db";
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
        const newPost = {
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

    async findPost(id: string): Promise<PostDBType | null> {
        if (!ObjectId.isValid(id)) {
            return null
        }

        const findPost = await postCollection.findOne({ _id: new ObjectId(id) })
        if (!findPost) {
            return null
        } return findPost;
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
