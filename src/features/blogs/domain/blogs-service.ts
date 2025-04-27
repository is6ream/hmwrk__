import { BlogInputModel, BlogDBType } from '../../../input-output-types/blogsAndPost-types';
import { ObjectId, WithId } from 'mongodb';
import { Types } from 'mongoose';
import { blogCollection } from '../../../db/mongo';
import { blogsRepository } from '../blogsRepository';

interface BlogDocument extends BlogDBType {
    _id: Types.ObjectId;
}

export const blogsService = {
    async deleteAll() {
        const deletedBlogs = await blogCollection.deleteMany({});
        return deletedBlogs;
    },
    async findAll(id: string) {
        return blogsRepository.findAll()
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
        const result = await blogCollection.findOne({ id }, { projection: { _id: 0 } });
        return result;
    },

    async updateBlog(id: string | undefined, updatedBlog: BlogInputModel): Promise<void | null> {
        if (!id) {
            return null
        }
        const updateResult = await blogCollection.updateOne(
            { id },
            {
                $set: {
                    name: updatedBlog.name,
                    description: updatedBlog.description,
                    websiteUrl: updatedBlog.websiteUrl
                },
            },
        );
        if (updateResult.matchedCount < 1) {
            throw new Error('Blog not exist');
        }
        return
    },

    async delete(id: string | undefined): Promise<void | null> { //здесь аналогично с id поработать
        const result = await blogCollection.deleteOne({ id });
        return;
    },
}
