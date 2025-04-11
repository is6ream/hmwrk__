import { PostInputModel } from "../../input-output-types/blogsAndPost-types";
import { blogsRepository } from "../blogs/blogsRepository";
import { PostDBType } from "../../input-output-types/blogsAndPost-types";
import { ObjectId, WithId } from "mongodb";
import { blogCollection, postCollection } from "../../db/mongo";



export const postRepository = {
    async deleteAll(): Promise<void> {
        const deleteResult = await postCollection.deleteMany();
        return;
    },
    async findAll(): Promise<WithId<PostDBType>[]> {
        return postCollection.find().toArray()
    },

    async findById(id: string): Promise<WithId<PostDBType> | null> {
        return postCollection.findOne({ _id: new ObjectId(id) })
    },
    async create(newPost: PostDBType): Promise<WithId<PostDBType>> {
        const insertResult = await postCollection.insertOne(newPost) //нужно разобраться с вопросом типизации
        return { ...newPost, _id: insertResult.insertedId }
    },
    async updatePost(id: string, updatedPost: PostInputModel): Promise<Boolean | null> {
        if (!ObjectId.isValid(id)) {
            console.log("Invalid objectId: ", id);
            return null
        }
        const result = await postCollection.updateOne({ _id: new ObjectId(id) }, { $set: { updatedPost: updatedPost } });
        return result.matchedCount === 1;
    },

    async delete(id: string): Promise<void> {
        const deleteResult = await postCollection.deleteOne({
            _id: new ObjectId(id),
        });

        if (deleteResult.deletedCount < 1) {
            throw new Error('Driver not exist');
        }
        return;
    }
}
