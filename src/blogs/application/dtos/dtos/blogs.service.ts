import { blogsRepository } from "../../../repositories/blogsRepository";
import { WithId } from "mongodb";
import { BlogPagination } from "../../../domain/blog";
import { postRepository } from "../../../../posts/postsRepository";
import { DomainError } from "../../../../core/errors/domain.error";
import { BlogsAttributes } from "./blogs-attributes";
/*import { BlogQueryInput} */


export const blogsService = {
    async findMany(queryDto: )
}