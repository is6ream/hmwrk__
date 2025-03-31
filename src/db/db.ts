export type BlogDBType = {
    id: string
    name: string
    description: string
    websiteUrl: string
}

export type PostDBType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}
export type DBType = {
    posts: PostDBType[],
    blogs: BlogDBType[]
}

export const db: DBType = {

    blogs: [{
        id: '0',
        name: 'gufran',
        description: 'the best mosque in city',
        websiteUrl: 'https://ru.wikipedia.org/wiki/%D0%93%D1%83%D1%84%D1%80%D0%B0%D0%BD',


    }],

    posts: [{
        id: "0",
        title: "utro",
        shortDescription: "the best day",
        content: "newVideo",
        blogId: "0", //возможно будет косяк
        blogName: 'sss'        
    }]
}

export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) { //значит очищаем базу
        db.blogs = []
        db.posts = []
        return
    }
    db.blogs = dataset.blogs || db.blogs //заменяем старые значения новыми
    db.posts = dataset.posts || db.posts //заменяем старые значения новыми
}

//---Generic
export type A = {
    title: string
}
//чтобы не хардкодить string, мы можем использовать generic(обобщенный тип)
type B<T> = {
    value: T
}