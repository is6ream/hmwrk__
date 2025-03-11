import { fromUTF8toBase64 } from './../../src/global-middlewares/admin-middleware';
import { DBType } from "../../src/db/db";
import { BlogType } from "../../src/db/db";
import { PostType } from "../../src/db/db";
// import {fromUTF8ToBase64} from '../../src/global-middlewares/admin-middleware'
import { SETTINGS } from '../../src/settings'

//готовые данные для переиспользования в тестах
export const codedAuth = fromUTF8toBase64(SETTINGS.ADMIN)

export const createString = (length: number) => {
    let s = ''
    for (let x = 1; x <= length; x++) {
        s += x % 10
    }
    return s
}

export const blog1: BlogType = {
    id: new Date().toISOString() + Math.random(),
    name: 'n1',
    description: 'd1',
    websiteUrl: 'http://example.com'
} as const //dataset нельзя изменять

export const blog7: BlogType = {
    id: new Date().toISOString() + Math.random(),
    name: 'n7',
    description: 'd7',
    websiteUrl: 'http://example7.com'
} as const

export const post1: PostType = {
    id: new Date().toISOString() + Math.random(),
    title: 't1',
    content: 'c1',
    shortDescription: 's1',
    blogId: blog1.id,
    blogName: 'n1'
} as const

export const post7: PostType = {
    id: new Date().toISOString() + Math.random(),
    title: 't7',
    content: 'c7',
    shortDescription: 's7',
    blogId: blog7.id,
    blogName: 'n7'
} as const

export const dataset1: DBType = {
    blogs: [blog1],
    posts: []
} as const

export const dataset2: DBType = {
    blogs: [blog1, blog7],
    posts: [post1]
} as const

