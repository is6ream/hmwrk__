export type DBType = {
    videos: any[],
    posts: any[],
    blogs: any[]
}

const date = new Date();

export const db: DBType = {
    videos: [{
        id: 0,
        title: 'Barca - Juve',
        author: 'Champions league',
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: date.toISOString(),
        publicationDate: new Date(date.setDate(date.getDate() + 1)).toISOString(),
        availableResolutions: [
            "P144"
        ],
    }],

    blogs: [{
        id: '0',
        name: 'gufran',
        description: 'the best mosque in city',
        websiteUrl: 'https://ru.wikipedia.org/wiki/%D0%93%D1%83%D1%84%D1%80%D0%B0%D0%BD'
    }], 
    posts: [{
        
    }]
}


//Partial - это встроенный тип, который создает новый тип на основе типа DBType, делая все его свойства необязательными.
//Это значит, что любый свойства объекта DBType могут быть опущены.
export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) { //значит очищаем базу
        db.videos = []
        return
    }
    db.videos = dataset.videos || db.videos //заменяем старые значения новыми
}

//---Generic
export type A = {
    title: string
}
//чтобы не хардкодить string, мы можем использовать generic(обобщенный тип)
type B<T> = {
    value: T
}