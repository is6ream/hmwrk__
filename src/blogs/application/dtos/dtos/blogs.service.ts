import { blogsRepository } from "../../../repositories/blogsRepository";
import { WithId } from "mongodb";
import { BlogPagination } from "../../../domain/blog";
import { postRepository } from "../../../../posts/postsRepository";
import { DomainError } from "../../../../core/errors/domain.error";
import { BlogsAttributes } from "./blogs-attributes";
import { Blog } from "../../../domain/blog";
import { BlogQueryInput } from "../../../routes/input/blog-query.input";



export const blogsService = {
    async findMany(
        queryDto: BlogQueryInput,
    ): Promise<{ items: WithId<Blog>[]; totalCount: number }> {
        return blogsRepository.findAll(queryDto)
    }
}