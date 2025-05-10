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
        return blogCollection.deleteMany({});
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
        return blogsRepository.findById(id);
    },

    async updateBlog(id: string | undefined, updatedBlog: BlogInputModel): Promise<void | null> {
        return blogsRepository.updateBlog(id, updatedBlog)
    },

    async delete(id: string | undefined): Promise<void | null> { //здесь аналогично с id поработать
        return blogsRepository.delete(id)
    },
}
