import { ObjectId } from "mongoose"

export type BlogBase = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type BlogViewModel = BlogBase 


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

