import { ObjectId } from 'mongodb';
import { SortDirection, W } from 'mongodb';
import { Blog } from './../domain/blog';
import { BlogInputModel, BlogDBType } from '../../input-output-types/blogsAndPost-types';
import { blogCollection } from '../../db/mongo';
import { Types } from 'mongoose';
import { BlogQueryInput } from '../routes/input/blog-query.input';
import { RepositoryNotFoundError } from '../../core/errors/repository-not-found.error';
import { WithId } from 'mongodb';


//Остановился на разборе пагинации и сортинга, нужно реализовать репозиторий блогов

//


export const blogsRepository = {
    async deleteAll() {
        const deletedBlogs = await blogCollection.deleteMany({});
        return deletedBlogs;
    },

    async findMany(
        queryDto: BlogQueryInput): Promise<WithId<{total}>>{

        },

    //реализовал метод create Blog
    async createBlog(newBlog: BlogDBType): Promise<string> {
        const insertResult = await blogCollection.insertOne(newBlog);
        return insertResult.insertedId.toString()
    },

    async findById(id: string): Promise<WithId<BlogDBType> | null> {
        return blogCollection.findOne({ _id: new ObjectId(id) })
    },

    async updateBlog(id: string | undefined, dto: BlogInputModel): Promise<void | null> {
        if (!id) {
            return null
        }
        const updateResult = await blogCollection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name: dto.name,
                    description: dto.description,
                    websiteUrl: dto.websiteUrl
                },
            },
        );
        if (updateResult.matchedCount < 1) {
            throw new RepositoryNotFoundError('Blog not exist')
        }
        return
    },

    async delete(id: string | undefined): Promise<void | null> { //здесь аналогично с id поработать
        const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });

        if(result.deletedCount < 1){
            throw new RepositoryNotFoundError('Blog not exist')
        }
        return;
    },
}
