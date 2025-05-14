import { Blog } from './../../domain/blog';
import { WithId } from "mongodb";
import { ResourceType } from '../../../core/types/resource-type';



export interface BlogListPaginatedOutput {
    pagesCount: number,
    page: number,
    pageSize: number,
    items: [
        {
            id: string,
            name: string,
            description: string,
            websiteUrl: string,
            createdAt: string,
            isMembership: true
        }
    ]
}


export interface BlogDataOutput {
    data: {
        type: string,
        id: string,
        name: string,
        description: string,
        websiteUrl: string,
        createdAt: string,
        isMembership: boolean
    }
}

export function mapToBlogOutput(blog: WithId<Blog>): BlogDataOutput {
    return {
        data: {
            type: ResourceType.Blogs,
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
    }
}