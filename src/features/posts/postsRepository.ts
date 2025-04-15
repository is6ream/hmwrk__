import { client } from './../../db/mongo';
import { BlogInputModel, PostInputModel } from "../../input-output-types/blogsAndPost-types";
import { blogsRepository } from "../blogs/blogsRepository";
import { PostDBType } from "../../input-output-types/blogsAndPost-types";
import { ObjectId, WithId } from "mongodb";
import { blogCollection, postCollection } from "../../db/mongo";



export const postRepository = {
    async deleteAll(): Promise<void> {
        const deleteResult = await postCollection.deleteMany({});
        return;
    },
    async findAll(): Promise<WithId<PostDBType>[]> {
        return postCollection.find().toArray()
    },

    async findById(id: string): Promise<WithId<PostDBType> | null> {
        return postCollection.findOne({ _id: new ObjectId(id) })
    },
    async create(newPost: PostInputModel): Promise<WithId<PostDBType>> {
        const blogForUsing = blogsRepository.createBlog({
            id: new Date().toISOString(),
            name: 'n1',
            description: 'd1',
            websiteUrl: 'http://slam.com'
        });

        const post: PostDBType = {
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: (await blogForUsing).name, //нужно получить blogName
            createdAt: new Date().toISOString()
        }
        const insertResult = await postCollection.insertOne(post)
        return { ...post, _id: insertResult.insertedId }
    },
    async updatePost(id: string, updatedPost: PostInputModel): Promise<Boolean | null> {
        if (!ObjectId.isValid(id)) {
            console.log("Invalid objectId: ", id);
            return null
        }
        const result = await postCollection.updateOne({ _id: new ObjectId(id) }, { $set: { updatedPost: updatedPost } });
        return result.matchedCount === 1;
    },

    async delete(id: string): Promise<void> {
        const deleteResult = await postCollection.deleteOne({
            _id: new ObjectId(id),
        });

        if (deleteResult.deletedCount < 1) {
            throw new Error('Post not exist');
        }
        return;
    }
}
