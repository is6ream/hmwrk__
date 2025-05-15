import { BlogQueryInput } from './../../../routes/input/blog-query.input';
import { Types } from 'mongoose';
import { blogsRepository } from '../../../repositories/blogsRepository';
import { WithId } from 'mongodb';
import { BlogInputModel } from '../../../../input-output-types/blogsAndPost-types';
import { BlogDBType } from '../../../../input-output-types/blogsAndPost-types';
import { blogCollection } from './../../../../db/mongo';
import { query } from 'express-validator';
import { SortDirection } from '../../../types';
import { Blog } from '../../../domain/blog';




//НАЧАТЬ РАБОТУ НАД ПАГИНАЦИЕЙ И СОРТИНГОМ
interface BlogAttributes {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}



interface BlogDocument extends BlogDBType {
    _id: Types.ObjectId;
}
//и типы тоже



export const blogsService = {
    async deleteAll() {
        return blogCollection.deleteMany({});
    },

    async findMany(queryDto: BlogQueryInput): 
    Promise <{items: WithId<Blog>[]; totalCount: number}>{
        return blogsRepository.findMany(queryDto)
    },

    async createBlog(dto: BlogAttributes): Promise<string> {
        const newBlog: Blog = {
            id: dto.id,
            name: dto.name,
            description: dto.description,
            websiteUrl: dto.websiteUrl,
            createdAt: dto.createdAt,
            isMembership: dto.isMembership
        }

        return blogsRepository.createBlog(newBlog)
    }
    ,
    async findById(id: string ): Promise<WithId<BlogDBType> | null> {
        return blogsRepository.findById(id);
    },

    async updateBlog(id: string | undefined, updatedBlog: BlogInputModel): Promise<void | null> {
        return blogsRepository.updateBlog(id, updatedBlog)
    },

    async delete(id: string | undefined): Promise<void | null> {
        return blogsRepository.delete(id)
    }
}
