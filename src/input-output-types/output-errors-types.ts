import { BlogInputModel, PostInputModel } from "./blogsAndPost-types"

export type OutputErrorsType = {
    errorsMessages: { message: string, field: string }[]
}

export type FieldNamesType = keyof BlogInputModel | keyof PostInputModel