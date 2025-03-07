import {req} from './test-helpers'
import {db, setDB} from '../src/db/db'
import {SETTINGS} from '../src/settings'
import { BlogInputModel } from '../src/input-output-types/blogsAndPost-types'
import {codedAuth, createString, dataset1} from './test-helpers'

describe('/blogs', () => {
    beforeAll(async () => {
        setDB()
    })

    it('should create', async () => {
        setDB()
        const newBlog: BlogInputModel = {
            name: 'n1',
            description: 'd1',
            websiteUrl: 'http://example.com'
        }

        const res = await req
        .post(SETTINGS.PATH.BLOGS)
        .set({'Authorization': 'Basic ' + codedAuth})
        .send(newBlog)
        .expect(201)

        console.log(res.body)
    })
})