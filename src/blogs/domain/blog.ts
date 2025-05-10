export interface Blog {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}


export interface BlogPagination {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: Blog[];
}

