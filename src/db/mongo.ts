import { PostDBType, BlogDBType } from './db';
import { Collection, Db, MongoClient } from 'mongodb';
import { SETTINGS } from '../settings'
const DRIVER_COLLECTION_NAME = 'drivers';

export let client: MongoClient;
export let blogsCollection: Collection<BlogDBType>;
export let postsCollection: Collection<PostDBType>;

// Подключения к бд
export async function runDB(url: string): Promise<void> {
    client = new MongoClient(url);
    const db: Db = client.db(SETTINGS.DB_NAME);

    //Инициализация коллекций
    postsCollection = db.collection<PostDBType>(SETTINGS.POST_COLLECTION_NAME)
    blogsCollection = db.collection<BlogDBType>(SETTINGS.ADMIN)

    try {
        await client.connect();
        await db.command({ ping: 1 });
        console.log('✅ Connected to the database');
    } catch (e) {
        await client.close();
        throw new Error(`❌ Database not connected: ${e}`);
    }
}