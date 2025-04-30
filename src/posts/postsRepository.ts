import { Types } from "mongoose";
import { BlogInputModel, PostInputModel } from "../input-output-types/blogsAndPost-types";
import { blogsRepository } from "../blogs/repositories/blogsRepository";
import { PostDBType } from "../input-output-types/blogsAndPost-types";
import { ObjectId, WithId } from "mongodb";
import { blogCollection, postCollection } from "../db/mongo";

interface PostDocument extends PostDBType {
    id: string,
    _id: Types.ObjectId
}

export const postRepository = {
    async deleteAll(): Promise<void> {
        const deleteResult = await postCollection.deleteMany({});
        return;
    },
    async findAll(): Promise<WithId<PostDBType>[]> {
        return postCollection.find({ projection: { _id: 0 } }).toArray()
    },

    async findById(id: string): Promise<WithId<PostDBType> | null> {
        return postCollection.findOne({ id }, { projection: { _id: 0 } })
    },
    async create(newPost: PostInputModel): Promise<PostDBType> {
        const blogForUsing = blogsRepository.createBlog({
            id: new Date().toISOString(),
            name: 'n1',
            description: 'd1',
            websiteUrl: 'http://slam.com'
        });

        const post: PostDocument = {
            _id: new Types.ObjectId(),
            id: new Date().toISOString(),
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: (await blogForUsing).name, //нужно получить blogName
            createdAt: new Date().toISOString()
        }
        const insertResult = await postCollection.insertOne(post)
        const { _id, ...result } = post

        return result;
    },
    async updatePost(id: string, updatedPost: PostInputModel): Promise<Boolean | null> {
        const result = await postCollection.updateOne({ id },
            {
                $set: {
                    title: updatedPost.title,
                    shortDescription: updatedPost.shortDescription,
                    content: updatedPost.content,
                    blogId: updatedPost.blogId
                }
            });
        return result.matchedCount === 1;
    },

    async delete(id: string): Promise<void> {
        const deleteResult = await postCollection.deleteOne({
            id,
        });

        if (deleteResult.deletedCount < 1) {
            throw new Error('Post not exist');
        }
        return;
    }
}
