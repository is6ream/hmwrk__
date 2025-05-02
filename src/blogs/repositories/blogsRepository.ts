import { BlogInputModel, BlogDBType } from '../../input-output-types/blogsAndPost-types';
import { ObjectId, WithId } from 'mongodb';
import { blogCollection } from '../../db/mongo';
import { Types } from 'mongoose';

interface BlogDocument extends BlogDBType {
    _id: Types.ObjectId;
}

export const blogsRepository = {
    async deleteAll() {
        const deletedBlogs = await blogCollection.deleteMany({});
        return deletedBlogs;
    },

    
    async createBlog(newBlog: BlogInputModel): Promise<WithId<BlogDBType>> {
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
        return insertResult;
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
