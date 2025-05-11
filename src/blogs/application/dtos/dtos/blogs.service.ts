import { Types } from 'mongoose';
import { blogsRepository } from '../../../repositories/blogsRepository';
import { WithId } from 'mongodb';
import { BlogInputModel } from '../../../../input-output-types/blogsAndPost-types';
import { BlogDBType } from '../../../../input-output-types/blogsAndPost-types';
import { blogCollection } from './../../../../db/mongo';
import { query } from 'express-validator';
import { SortDirection } from '../../../types';



const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_DIRECTION = SortDirection.Desc

export function paginationAndSortingValidation<T extends string>(sortFieldsEnum: Record<string, T>) {
    return [
        query('pageNumber')
            .optional()
            .default(DEFAULT_PAGE)
            .isInt()
            .withMessage('Page must be a positive integer')
            .toInt(),

        query('pageSize')
            .optional()
            .default(DEFAULT_PAGE_SIZE)
            .isInt({ min: 1, max: 100 })
            .withMessage('Page size must be between 1 and 100')
            .toInt(),

        query('sortBy')
            .optional()
            .default(Object.values(sortFieldsEnum)[0])
            .isIn(Object.values(sortFieldsEnum))
            .withMessage(`Allowed sort fields: ${Object.values(sortFieldsEnum).join(', ')}`),


        query('sortDirection')
            .optional()
            .default(DEFAULT_SORT_DIRECTION)
            .isIn(Object.values(SortDirection))
            .withMessage(`Sort direction must be one of: ${Object.values(SortDirection).join(', ')}`)
    ]
}



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

    async delete(id: string | undefined): Promise<void | null> {
        return blogsRepository.delete(id)
    }
}
