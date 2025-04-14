export type BlogBase = {
    name: string,
    description: string,
    webSiteUrl: string
}

export type PostBase = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export type BlogDBType = BlogBase & {
    createdAt: string
    isMembership: boolean
}

export type PostDBType = PostBase & {
    blogName: string
    createdAt: string
}


export type BlogInputModel = BlogBase;
export type PostInputModel = PostBase;

export type DBType = {
    posts: PostDBType[],
    blogs: BlogDBType[]
}

