"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDB = exports.db = void 0;
exports.db = {
    blogs: [{
            id: '0',
            name: 'gufran',
            description: 'the best mosque in city',
            websiteUrl: 'https://ru.wikipedia.org/wiki/%D0%93%D1%83%D1%84%D1%80%D0%B0%D0%BD'
        }],
    posts: [{
            id: "0",
            title: "utro",
            shortDescription: "the best day",
            content: "newVideo",
            blogId: "0",
            blogName: "utroNamaz"
        }]
};
const setDB = (dataset) => {
    if (!dataset) { //значит очищаем базу
        exports.db.blogs = [];
        exports.db.posts = [];
        return;
    }
    exports.db.blogs = dataset.blogs || exports.db.blogs; //заменяем старые значения новыми
    exports.db.posts = dataset.posts || exports.db.posts; //заменяем старые значения новыми
};
exports.setDB = setDB;
