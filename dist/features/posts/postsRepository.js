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
const db_1 = require("../../db/db");
const blogsRepository_1 = require("../blogs/blogsRepository");
const mongo_1 = require("../../db/mongo");
exports.postRepository = {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_1.postCollection.find();
        });
    },
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = {
                id: new Date().toISOString() + Math.random(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: blogsRepository_1.blogsRepository.find(post.blogId).name
            };
            //осталось пройти один тест
            db_1.db.posts = [...db_1.db.posts, newPost];
            yield mongo_1.postCollection.insertOne(newPost);
            return newPost;
        });
    },
    findPost(id) {
        return db_1.db.posts.find(p => p.id === id);
    },
    updatePost(id, updatedPost) {
        const findPost = db_1.db.posts.find(p => p.id === id);
        if (!findPost) {
            return { error: "Not found!" };
        }
        findPost.title = updatedPost.title;
        findPost.shortDescription = updatedPost.shortDescription;
        findPost.content = updatedPost.content;
        findPost.blogId = updatedPost.blogId;
        return findPost;
    },
    delete(id) {
        let filteredPosts = db_1.db.posts.filter(p => p.id !== id);
        db_1.db.posts = filteredPosts;
        return filteredPosts;
    },
    clear() {
        db_1.db.posts = [];
    }
};
