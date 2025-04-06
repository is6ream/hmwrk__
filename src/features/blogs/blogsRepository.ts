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
            isMembership: false
        }))
    },
    async create(blog: BlogInputModel): Promise<BlogDBType> {
        const newBlog: BlogDBType = {
            id: new Date().toISOString() + Math.random(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            isMembership: false
        }
        const result = await blogCollection.insertOne(newBlog);

        return newBlog;
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
            isMembership: false
        };
    },

    async updateBlog(id: string, updatedBlog: BlogInputModel): Promise<Boolean> {
        const result = await blogCollection.updateOne({ id: id }, { $set: { updateBlog: updatedBlog } })
        if (!result) {
            return false
        }
        return true;
    },

    async delete(id: string) {
        const result = await blogCollection.deleteOne({ id: id });
        return result;
    },
}






