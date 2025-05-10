import { Types } from 'mongoose';
import { blogsRepository } from '../../../repositories/blogsRepository';
import { WithId } from 'mongodb';
import { BlogInputModel } from '../../../../input-output-types/blogsAndPost-types';
import { BlogDBType } from '../../../../input-output-types/blogsAndPost-types';
import { blogCollection } from './../../../../db/mongo';
interface BlogDocument extends BlogDBType {
    _id: Types.ObjectId;
}

export const blogsService = {
    async deleteAll() {
        const deletedBlogs = await blogCollection.deleteMany({});
        return deletedBlogs;
    },
    async findMany(queryDto: any) {
        return blogsRepository.findMany(queryDto)
    },
    async createBlog(newBlog: BlogInputModel): Promise<BlogDBType> {
        const blog = {
            id: new Date().toISOString(),
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: true
        }
        return blogsRepository.createBlog(blog)
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
