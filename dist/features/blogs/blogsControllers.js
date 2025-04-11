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
const http_statuses_1 = require("../../core/http-statuses");
exports.blogsControllers = {
    deleteAllDataController: ((req, res) => {
        console.log(`Received request: ${req.method} ${req.url}`);
        const deleteAll = blogsRepository_1.blogsRepository.deleteAll();
        res.sendStatus(http_statuses_1.HttpStatus.NoContent);
    }),
    getBlogsController: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getAllBlogs = yield blogsRepository_1.blogsRepository.findAll();
        console.log(getAllBlogs);
        res.status(http_statuses_1.HttpStatus.Ok).json(getAllBlogs);
    })),
    createBlogController: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const createBlogs = yield blogsRepository_1.blogsRepository.createBlog(req.body);
        res.status(http_statuses_1.HttpStatus.Created).json(createBlogs);
    })),
    findBlogConstroller: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const findBlog = yield blogsRepository_1.blogsRepository.findById(req.params.id);
        res.status(http_statuses_1.HttpStatus.Ok).json(findBlog);
    })),
    updateBlogController: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedBlog = yield blogsRepository_1.blogsRepository.updateBlog(req.params.id, req.body);
        res.sendStatus(http_statuses_1.HttpStatus.NoContent);
    })),
    deleteBlogController: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedBlog = yield blogsRepository_1.blogsRepository.delete(req.params.id);
        res.sendStatus(http_statuses_1.HttpStatus.NoContent);
    }))
};
