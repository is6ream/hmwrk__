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
exports.blogsRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../db/mongo");
const mongoose_1 = require("mongoose");
exports.blogsRepository = {
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBlogs = yield mongo_1.blogCollection.deleteMany({});
            return deletedBlogs;
        });
    },
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_1.blogCollection.find().toArray();
        });
    },
    createBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = {
                _id: new mongoose_1.Types.ObjectId(),
                id: new Date().toISOString(),
                name: newBlog.name,
                description: newBlog.description,
                websiteUrl: newBlog.websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false,
            };
            const insertResult = yield mongo_1.blogCollection.insertOne(blog);
            const { _id } = blog, result = __rest(blog, ["_id"]);
            return result;
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || !mongodb_1.ObjectId.isValid(id)) { //Вопрос, какой id передают в этот обработчик тесты
                return null;
            } //пока также ошибка с BSON падает, добавил проверку, не помогло
            return mongo_1.blogCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    updateBlog(id, updatedBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_1.blogCollection.
                updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: updatedBlog });
            return result.matchedCount === 1;
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_1.blogCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return result;
        });
    },
};
