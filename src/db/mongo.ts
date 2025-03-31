import { MongoClient, Collection } from "mongodb";
import { BlogDBType, PostDBType } from "./db";
import { SETTINGS } from "../settings";
import * as dotenv from 'dotenv';

dotenv.config();

export let blogsCollection: any;
export let postsCollection: any;

export async function runDB(url: string): Promise<boolean>{
    let client = new MongoClient(url);
    let db = client.db(SETTINGS.DB_NAME);

    blogsCollection = db.collection<BlogDBType>(SETTINGS.PATH.BLOGS)
    postsCollection = db.collection<PostDBType>(SETTINGS.PATH.POSTS)

    try{
        await client.connect();
        await db.command({ping: 1});
        console.log('OK')
        return true
    } catch(error){
        console.log(error)
        await client.close()
        return false
    }
}