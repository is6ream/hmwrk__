import { PostInputModel } from "../../input-output-types/blogsAndPost-types";
import { blogsRepository } from "../blogs/blogsRepository";
import { PostDBType } from "../../db/db";
import { ObjectId } from "mongodb";
import { blogCollection, postCollection } from "../../db/mongo";



export const postRepository = {
    async getAll() {
        return postCollection.find()
    },

    async createPost(post: PostInputModel): Promise<PostDBType> {
        const blog = await blogsRepository.find(post.blogId)
        const newPost = {
            id: new Date().toISOString() + Math.random(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: blog?.name || "Unknown",
            createdAt: new Date().toISOString()
        }
        const result = await postCollection.insertOne(newPost);
        return newPost;
    },

    async findPost(id: string): Promise<PostDBType | null> {
        const findPost = await postCollection.findOne({ _id: new ObjectId(id) })
        console.log(findPost)
        if (!findPost) {
            return null
        } return findPost;
    },
    async updatePost(id: string, updatedPost: PostInputModel): Promise<Boolean> {
        const result = await postCollection.updateOne({ id: id }, { $set: { updatedPost: updatedPost } });
        if (!result) {
            return false;
        } return true
    },

    async delete(id: string) {
        const result = await blogCollection.deleteOne({ id: id });
        return result
    }
}