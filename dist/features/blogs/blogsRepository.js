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
exports.blogsRepository = void 0;
const db_1 = require("../../db/db");
exports.blogsRepository = {
    deleteAll() {
        db_1.db.blogs = [];
        db_1.db.posts = [];
        return db_1.db;
    },
    getAll() {
        // console.log("Тут работает")
        return db_1.db.blogs;
    },
    create(blog) {
        const newBlog = {
            id: new Date().toISOString() + Math.random(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
        };
        db_1.db.blogs = [...db_1.db.blogs, newBlog];
        return newBlog;
    },
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => setTimeout(resolve, 1000));
            return db_1.db.blogs.find(b => b.id === id);
        });
    },
    updateBlog(id, updatedBlog) {
        const findBlog = db_1.db.blogs.find(b => b.id === id);
        if (!findBlog) {
            return { error: "Not found" };
        }
        findBlog.name = updatedBlog.name;
        findBlog.description = updatedBlog.description;
        findBlog.websiteUrl = updatedBlog.websiteUrl;
        return findBlog;
    },
    delete(id) {
        let filteredBlogs = db_1.db.blogs.filter(b => b.id !== id);
        if (!filteredBlogs) {
            return { error: "Not found" };
        }
        db_1.db.blogs = filteredBlogs;
        return filteredBlogs;
    },
    clear() {
        db_1.db.blogs = [];
    }
};
