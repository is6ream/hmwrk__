export type ParamType = {
    id: string
}

export type BodyType = {
    id: number
    title: string
}

export type QueryType = {
    search?: string
}

export type OutputErrorsType = {
    errorsMessages: {
        message: string
        field: string
    }[]

}

export enum SortDirection {
    Asc = 'asc',
    Desc = 'desc'
};
