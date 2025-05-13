import { BlogDBType } from './../../input-output-types/blogsAndPost-types';
import { WithId } from 'mongodb';
import { SortDirection, W } from 'mongodb';
import { Blog } from './../domain/blog';
import { BlogInputModel, BlogDBType } from '../../input-output-types/blogsAndPost-types';
import { ObjectId, WithId } from 'mongodb';
import { blogCollection } from '../../db/mongo';
import { Types } from 'mongoose';
import { BlogQueryInput } from '../routes/input/blog-query.input';



//Остановился на разборе пагинации и сортинга, нужно реализовать репозиторий блогов

//


export const blogsRepository = {
    async deleteAll() {
        const deletedBlogs = await blogCollection.deleteMany({});
        return deletedBlogs;
    },

    async findMany(
        queryDto: BlogQueryInput,
    ): Promise<{ items: WithId<Blog>[]; totalCount: number }> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchBlogNameTerm,
        } = queryDto;

        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};

        if (searchBlogNameTerm) {
            filter.name = ($regex: searchBlogNameTerm, $options: 'i')
        }


    },


    async createBlog(newBlog: BlogDBType): Promise<string> {
        const insertResult = await blogCollection.insertOne(newBlog);
        return insertResult.insertedId.toString()
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
