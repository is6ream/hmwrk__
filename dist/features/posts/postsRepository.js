"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const db_1 = require("../../db/db");
exports.postRepository = {
    getAll() {
        return db_1.db.posts;
    },
    createPost(post) {
        const newPost = {
            id: new Date().toISOString() + Math.random(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName
        };
        db_1.db.posts = [...db_1.db.posts, newPost];
        return newPost;
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
