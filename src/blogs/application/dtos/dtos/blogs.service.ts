import { blogsRepository } from "../../../repositories/blogsRepository";
import { WithId } from "mongodb";
import { BlogPagination } from "../../../domain/blog";
import { postRepository } from "../../../../posts/postsRepository";
import { DomainError } from "../../../../core/errors/domain.error";
import { BlogsAttributes } from "./blogs-attributes";
import { Blog } from "../../../domain/blog";



export const blogsService = {
    async findMany(
        queryDto: DriverQueryInput,
    ): Promise<{ items: WithId<Blog>[]; totaCount: number }> {
        return blogsRepository.findAll(queryDto)
    },

    async findByIdOrFail(id: string): Promise<WithId<Blog>> {
        return blogsRepository.findById(id)
    },

    async createBlog(dto: BlogsAttributes)
}