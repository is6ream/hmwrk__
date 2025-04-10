import { Response } from 'express';
import { blogCollection } from './../../db/mongo';
import { BlogInputModel, BlogDBType } from './../../input-output-types/blogsAndPost-types';
import { ObjectId, WithId } from 'mongodb';


export const blogsRepository = {
    async deleteAll() {
        const deletedBlogs = await blogCollection.deleteMany({});
        return deletedBlogs;
    },
    async findAll(): Promise<WithId<BlogDBType>[]> {
        return blogCollection.find().toArray()
    },

    async createBlog(newBlog: BlogInputModel): Promise<WithId<BlogDBType>> {
        const blog: BlogDBType = {
            id: new Date().toISOString(),
            name: newBlog.name,
            description: newBlog.description,
            webSiteUrl: newBlog.webSiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: true
        }
        const insertResult = await blogCollection.insertOne(blog);
        return { ...blog, _id: insertResult.insertedId }
    },


    async findById(id: string | undefined): Promise<WithId<BlogDBType> | null> {
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






