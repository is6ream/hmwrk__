import { Response } from 'express';
import { blogCollection } from './../../db/mongo';
import { BlogInputModel, BlogDBType } from './../../input-output-types/blogsAndPost-types';
import { ObjectId, WithId } from 'mongodb';


export const blogsRepository = {
    async deleteAll() {
        const deletedBlogs = await blogCollection.deleteMany({});
        return deletedBlogs;
    },

    // async getAll(): Promise<BlogDBType[]> {
    //     const blogs = await blogCollection.find({}).toArray();
    //     return blogs.map(blog => ({
    //         id: blog._id.toString(),
    //         name: blog.name,
    //         description: blog.description,
    //         webSiteUrl: blog.webSiteUrl,
    //         createdAt: blog.createdAt,
    //         isMembership: false
    //     }))
    // },
async findAll():Promise<WithId<BlogDBType>[]>{
    return blogCollection.find().toArray()
}
    ,

    async create(blog: BlogInputModel): Promise<BlogDBType> {
        const newBlog: BlogDBType = {
            id: new Date().toISOString(),
            name: blog.name,
            description: blog.description,
            webSiteUrl: blog.webSiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }

        const result = await blogCollection.insertOne(newBlog);
        return newBlog
    },

    async find(id: string | undefined): Promise<BlogDBType | null> {
        const findBlog = await blogCollection.findOne({ _id: new ObjectId(id) })
        if (!findBlog) {
            return null
        }

        return {
            id: findBlog._id.toString(),
            name: findBlog.name,
            description: findBlog.description,
            webSiteUrl: findBlog.webSiteUrl,
            createdAt: findBlog.createdAt,
            isMembership: false
        };
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






