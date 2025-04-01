//... здесь imports как я понял
import { Collection, Db, MongoClient } from "mongodb";
import { SETTINGS } from "../settings";
import { BlogDBType, PostDBType } from "./db";

//получение доступа к бд
const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL);
export const db: Db = client.db(SETTINGS.DB_NAME);

//Получение доступа к коллекциям
export const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>(SETTINGS.BLOG_COLLECTION_NAME)
export const postCollection: Collection<PostDBType> = db.collection<PostDBType>(SETTINGS.POST_COLLECTION_NAME)

//проверка подключения к бд
export const connectToDB = async () => {
    try {
        await client.connect()
        console.log('connected to db')
        return true
    } catch (e) {
        {
            console.log(e)
            await client.close()
            return false
        }
    }
}