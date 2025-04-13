"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const blogsRepository_1 = require("../blogs/blogsRepository");
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../db/mongo");
exports.postRepository = {
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield mongo_1.postCollection.deleteMany();
            return;
        });
    },
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_1.postCollection.find().toArray();
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_1.postCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    create(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogForUsing = blogsRepository_1.blogsRepository.createBlog({
                name: 'n1',
                description: 'd1',
                webSiteUrl: 'http://slam.com'
            });
            const post = {
                id: new Date().toISOString(),
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                blogId: newPost.blogId,
                blogName: (yield blogForUsing).name, //нужно получить blogName
                createdAt: new Date().toISOString()
            };
            const insertResult = yield mongo_1.postCollection.insertOne(post);
            return Object.assign(Object.assign({}, post), { _id: insertResult.insertedId });
        });
    },
    updatePost(id, updatedPost) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id)) {
                console.log("Invalid objectId: ", id);
                return null;
            }
            const result = yield mongo_1.postCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { updatedPost: updatedPost } });
            return result.matchedCount === 1;
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield mongo_1.postCollection.deleteOne({
                _id: new mongodb_1.ObjectId(id),
            });
            if (deleteResult.deletedCount < 1) {
                throw new Error('Post not exist');
            }
            return;
        });
    }
};
