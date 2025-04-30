export type BlogsAttributes = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean

}
export type BlogViewModel = BlogsAttributes


export type BlogDBType = BlogsAttributes & {
    createdAt: string
    isMembership: boolean
}


export type BlogInputModel = BlogsAttributes;
