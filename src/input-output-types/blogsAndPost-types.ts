export type BlogDBType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type BlogViewModel = BlogDBType 


export interface BlogInputModel {
    name: string,
    description: string,
    websiteUrl: string
}

export type PostBase = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}



export type PostDBType = PostBase & {
    blogName: string
    createdAt: string
}
export type PostInputModel = PostBase;

export type DBType = {
    posts: PostDBType[],
    blogs: BlogDBType[]
}

