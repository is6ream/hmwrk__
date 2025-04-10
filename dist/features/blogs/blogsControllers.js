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
exports.blogsControllers = void 0;
const blogsRepository_1 = require("./blogsRepository");
exports.blogsControllers = {
    deleteAllDataController: ((req, res) => {
        console.log(`Received request: ${req.method} ${req.url}`);
        const deleteAll = blogsRepository_1.blogsRepository.deleteAll();
        res.status(204).send();
    }),
    getBlogsController: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getAllBlogs = yield blogsRepository_1.blogsRepository.findAll();
        console.log(getAllBlogs);
        res.status(200).json(getAllBlogs);
        console.log('getBlogs');
    })),
    createBlogController: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const createBlogs = yield blogsRepository_1.blogsRepository.create(req.body);
        res.status(201).json(createBlogs);
    })),
    findBlogConstroller: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const findBlog = yield blogsRepository_1.blogsRepository.find(req.params.id);
        res.send(findBlog);
    })),
    updateBlogController: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedBlog = yield blogsRepository_1.blogsRepository.updateBlog(req.params.id, req.body);
        res.status(204).send();
    })),
    deleteBlogController: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedBlog = yield blogsRepository_1.blogsRepository.delete(req.params.id);
        res.status(204).send();
    }))
};
