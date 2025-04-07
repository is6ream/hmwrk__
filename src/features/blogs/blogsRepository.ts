import { blogCollection } from './../../db/mongo';
import { BlogInputModel } from './../../input-output-types/blogsAndPost-types';
import { BlogDBType } from '../../db/db';
import { ObjectId } from 'mongodb';


export const blogsRepository = {
    async deleteAll() {
        const deletedBlogs = await blogCollection.deleteMany({});
        return deletedBlogs;
    },

    async getAll(): Promise<BlogDBType[]> {
        const blogs = await blogCollection.find({}).toArray();
        return blogs.map(blog => ({
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: false
        }))
    },
    async create(blog: BlogInputModel): Promise<BlogDBType> {
        const newBlog: BlogDBType = {
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const result = await blogCollection.insertOne(newBlog);

        return {
            id: result.insertedId.toString(),
            ...newBlog
        };
    },

    async find(id: string): Promise<BlogDBType | null> {
        const findBlog = await blogCollection.findOne({ _id: new ObjectId(id) })
        if (!findBlog) {
            return null
        }

        return {
            id: findBlog._id.toString(),
            name: findBlog.name,
            description: findBlog.description,
            websiteUrl: findBlog.websiteUrl,
            createdAt: findBlog.createdAt,
            isMembership: false
        };
    },

    async updateBlog(id: string, updatedBlog: BlogInputModel): Promise<Boolean> {
        const result = await blogCollection.
            updateOne({ _id: new ObjectId(id) },
                { $set: updatedBlog })
        return result.matchedCount === 1;

    },

    async delete(id: string) {
        const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });
        return result;
    },
}






