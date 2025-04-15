import { BlogInputModel, BlogDBType } from './../../input-output-types/blogsAndPost-types';
import { ObjectId, WithId } from 'mongodb';
import { blogCollection } from '../../db/mongo';
import { blogIdValidator } from '../posts/middlewares/postValidators';
import { Result } from 'express-validator';
import { Types } from 'mongoose';

interface BlogDocument extends BlogDBType {
    _id: Types.ObjectId;
}

export const blogsRepository = {
    async deleteAll() {
        const deletedBlogs = await blogCollection.deleteMany({});
        return deletedBlogs;
    },
    async findAll(): Promise<WithId<BlogDBType>[]> {
        return blogCollection.find().toArray()
    },

    async createBlog(newBlog: BlogInputModel): Promise<BlogDBType> {
        const blog: BlogDocument = {
            _id: new Types.ObjectId(),
            id: new Date().toISOString(),
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }
        const insertResult = await blogCollection.insertOne(blog);
        const { _id, ...result } = blog
        return result;
    },


    async findById(id: string | undefined): Promise<WithId<BlogDBType> | null> {
        if (!id || !ObjectId.isValid(id)) {
            return null;
        } //пока также ошибка с BSON падает, добавил проверку, не помогло
        return blogCollection.findOne({ _id: new ObjectId(id) })
    },

    async updateBlog(id: string | undefined, updatedBlog: BlogInputModel): Promise<Boolean> {
        const result = await blogCollection.
            updateOne({ _id: new ObjectId(id) },
                { $set: updatedBlog })
        return result.matchedCount === 1;

    },

    async delete(id: string | undefined) {
        const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });
        return result;
    },
}






