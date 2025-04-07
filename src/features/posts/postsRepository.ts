import { setDB } from './../../db/db';
import { PostInputModel } from "../../input-output-types/blogsAndPost-types";
import { blogsRepository } from "../blogs/blogsRepository";
import { PostDBType } from "../../db/db";
import { ObjectId } from "mongodb";
import { blogCollection, postCollection } from "../../db/mongo";
import { rmSync } from "fs";



export const postRepository = {
    async getAll() {
        return postCollection.find()
    },

    async createPost(post: PostInputModel): Promise<PostDBType> {
        const blog = await blogsRepository.find(post.blogId);
        if (!blog) {
            throw new Error('Blog not found')
        }
        const newPost = {
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: blog?.name || "Unknown",
            createdAt: new Date().toISOString(),
        }
        const result = await postCollection.insertOne(newPost);
        return {
            id: result.insertedId.toString(),
            ...newPost
        }
        //из-за данного метода падает сервер
    },

    async findPost(id: string): Promise<PostDBType | null> {
        if (!ObjectId.isValid(id)) {
            console.log("Invalid objectId: ", id);
            return null
        }

        const findPost = await postCollection.findOne({ _id: new ObjectId(id) })
        console.log(findPost)
        if (!findPost) {
            return null
        } return findPost;
    },
    async updatePost(id: string, updatedPost: PostInputModel): Promise<Boolean | null> {
        if (!ObjectId.isValid(id)) {
            console.log("Invalid objectId: ", id);
            return null
        }
        const result = await postCollection.updateOne({ _id: new ObjectId(id) }, { $set: { updatedPost: updatedPost } });
        return result.matchedCount === 1;
    },

    async delete(id: string) {
        const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });
        return result
    }
}

const posts = await postCollection.find().toArray();
const posts = await postCollection.find({}, { projection: { title: 'jam' } }).toArray();
const posts = await postCollection.find({}, { projection: { _id: 0 } }).toArray();

const post = await postCollection.findOne({ _id: new ObjectId(id) });
const insertResult = await postCollection.insertOne(newPost);//в ответе от insertOne приходит objectId 


const updateResult = await postCollection.updateOne(
    { _id: new ObjectId(id) }
)

class User {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        alert(this.name)
    }
}

let user = new User('Slam')
user.sayHi()

function Admin(name) {
    this.name = name;
}
Admin.prototype.sayHi = function () {
    alert(this.name)
}


