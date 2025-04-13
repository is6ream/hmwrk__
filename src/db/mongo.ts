import { Collection, Db, MongoClient } from "mongodb";
import { SETTINGS } from "../settings";
import { BlogDBType, PostDBType } from "../input-output-types/blogsAndPost-types";

const POST_COLLECTION_NAME = 'posts'
const BLOG_COLLECTION_NAME = 'blogs'

export let client: MongoClient;
export let postCollection: Collection<PostDBType>;
export let blogCollection: Collection<BlogDBType>;

//Подключение к бд
export async function runDB(url: string): Promise<void> {
    client = new MongoClient(url);
    const db: Db = client.db(SETTINGS.DB_NAME);

    //Инициализация коллекций 
    postCollection = db.collection<PostDBType>(POST_COLLECTION_NAME)
    blogCollection = db.collection<BlogDBType>(BLOG_COLLECTION_NAME)
    // console.log(blogCollection, ' collection')
    try {
        await client.connect();
        await db.command({ ping: 1 })
        console.log('✅ Connected to the database')
    } catch (error) {
        await client.close();
        throw new Error(`❌ Database not connected: ${error}`)
    }
};


export async function clearDatabase() {
    await blogCollection.deleteMany({})
    await postCollection.deleteMany({})
};



