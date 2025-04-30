import { WithId } from "mongodb";
import { BlogBase, BlogInputModel, BlogViewModel } from "../../../input-output-types/blogsAndPost-types";


export function mapToBlogViewModel(blog: WithId<BlogInputModel>): BlogViewModel {
    return {
        id: blog.id.toString(),
        name: blog.name.toString(),
        description: blog.description.toString(),
        websiteUrl: blog.websiteUrl.toString(),
        createdAt: blog.createdAt.toString(),
        isMembership: blog.isMembership
    }
}