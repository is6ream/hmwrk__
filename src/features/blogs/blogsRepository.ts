import { websiteUrlValidator } from './middlewares/blogValidators';
import { BlogInputModel } from './../../input-output-types/blogsAndPost-types';
import { BlogDBType } from '../../db/db';
import { db } from '../../db/db';
import { blogCollection } from '../../db/mongo';


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
            websiteUrl: blog.websiteUrl
        }))
    },
    async create(blog: BlogInputModel): Promise<BlogDBType> {
        const newBlog: BlogDBType = {
            id: new Date().toISOString() + Math.random(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
        }
        const result = await blogCollection.insertOne(newBlog);
        return newBlog
    },

    async find(id: string): BlogInputModel | null {
        const findBlog = db.blogs.find(b => b.id === id);
        if (!findBlog) {
            return null
        }
        return findBlog;
    },
    async updateBlog(id: string, updatedBlog: BlogInputModel) {
        const findBlog = db.blogs.find(b => b.id === id)
        if (!findBlog) {
            return { error: "Not found" }
        }
        findBlog.name = updatedBlog.name
        findBlog.description = updatedBlog.description
        findBlog.websiteUrl = updatedBlog.websiteUrl

        return findBlog;
    },
    async delete(id: string) {
        let filteredBlogs = db.blogs.filter(b => b.id !== id)
        if (!filteredBlogs) {
            return { error: "Not found" }
        }
        db.blogs = filteredBlogs
        return filteredBlogs;
    },

    async clear() {
        db.blogs = []
    }


}






