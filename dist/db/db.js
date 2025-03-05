"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDB = exports.db = void 0;
const date = new Date();
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
//Partial - это встроенный тип, который создает новый тип на основе типа DBType, делая все его свойства необязательными.
//Это значит, что любый свойства объекта DBType могут быть опущены.
const setDB = (dataset) => {
    if (!dataset) { //значит очищаем базу
        exports.db.videos = [];
        return;
    }
    exports.db.videos = dataset.videos || exports.db.videos; //заменяем старые значения новыми
};
exports.setDB = setDB;
