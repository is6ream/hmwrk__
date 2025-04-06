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
const mongo_1 = require("./../../db/mongo");
const mongodb_1 = require("mongodb");
exports.blogsRepository = {
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBlogs = yield mongo_1.blogCollection.deleteMany({});
            return deletedBlogs;
        });
    },
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield mongo_1.blogCollection.find({}).toArray();
            return blogs.map(blog => ({
                id: blog._id.toString(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                isMembership: true
            }));
        });
    },
    create(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: new Date().toISOString() + Math.random(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                isMembership: true
            };
            const result = yield mongo_1.blogCollection.insertOne(newBlog);
            return newBlog;
        });
    },
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findBlog = yield mongo_1.blogCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!findBlog) {
                return null;
            }
            return {
                id: findBlog._id.toString(),
                name: findBlog.name,
                description: findBlog.description,
                websiteUrl: findBlog.websiteUrl,
                isMembership: true
            };
        });
    },
    updateBlog(id, updatedBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_1.blogCollection.updateOne({ id: id }, { $set: { updateBlog: updatedBlog } });
            if (!result) {
                return { error: "Not found" };
            }
            return result;
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_1.blogCollection.deleteOne({ id: id });
            return result;
        });
    },
};
