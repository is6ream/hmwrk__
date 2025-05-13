import { BlogDataOutput } from './map-to-blog-list-paginated-otput';
import { WithId } from "mongodb";
import { Blog } from "../../domain/blog";



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
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: true
}

export function mapToBlogsListPaginatedOutput(
    blogs: WithId<Blog>[],
    meta: { pageNumber: number, pageSize: number, totalCount: number }
): BlogListPaginatedOutput {
    return {
        meta: {
            page: meta.pageNumber,
            pageSize: meta.pageSize,
            pageCount: Math.ceil(meta.totalCount / meta.pageSize),
            totalCount: meta.totalCount
        },

        data: blogs.map(
            (blog): BlogDataOutput => ({
                id: blog._id.toString(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                isMembership: blog.isMembership,
            })
        )
    }
}