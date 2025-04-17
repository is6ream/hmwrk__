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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const mongoose_1 = require("mongoose");
const blogsRepository_1 = require("../blogs/blogsRepository");
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../db/mongo");
exports.postRepository = {
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield mongo_1.postCollection.deleteMany({});
            return;
        });
    },
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_1.postCollection.find({ projection: { _id: 0 } }).toArray();
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_1.postCollection.findOne({ id }, { projection: { _id: 0 } });
        });
    },
    create(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogForUsing = blogsRepository_1.blogsRepository.createBlog({
                id: new Date().toISOString(),
                name: 'n1',
                description: 'd1',
                websiteUrl: 'http://slam.com'
            });
            const post = {
                _id: new mongoose_1.Types.ObjectId(),
                id: new Date().toISOString(),
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                blogId: newPost.blogId,
                blogName: (yield blogForUsing).name, //нужно получить blogName
                createdAt: new Date().toISOString()
            };
            const insertResult = yield mongo_1.postCollection.insertOne(post);
            const { _id } = post, result = __rest(post, ["_id"]);
            return result;
        });
    },
    updatePost(id, updatedPost) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id)) {
                console.log("Invalid objectId: ", id);
                return null;
            }
            const result = yield mongo_1.postCollection.updateOne({ id }, { $set: { updatedPost: updatedPost } });
            return result.matchedCount === 1;
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield mongo_1.postCollection.deleteOne({
                id,
            });
            if (deleteResult.deletedCount < 1) {
                throw new Error('Post not exist');
            }
            return;
        });
    }
};
