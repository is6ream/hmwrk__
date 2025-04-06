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
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_1.postCollection.find();
        });
    },
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogsRepository_1.blogsRepository.find(post.blogId);
            const newPost = {
                id: new Date().toISOString() + Math.random(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: (blog === null || blog === void 0 ? void 0 : blog.name) || "Unknown",
                createdAt: new Date().toISOString()
            };
            const result = yield mongo_1.postCollection.insertOne(newPost);
            return newPost;
        });
    },
    findPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findPost = yield mongo_1.postCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            console.log(findPost);
            if (!findPost) {
                return null;
            }
            return findPost;
        });
    },
    updatePost(id, updatedPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_1.postCollection.updateOne({ id: id }, { $set: { updatedPost: updatedPost } });
            if (!result) {
                return false;
            }
            return true;
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_1.blogCollection.deleteOne({ id: id });
            return result;
        });
    }
};
