"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataset2 = exports.dataset1 = exports.post7 = exports.post1 = exports.blog7 = exports.blog1 = exports.createString = exports.codedAuth = void 0;
const admin_middleware_1 = require("./../../src/global-middlewares/admin-middleware");
// import {fromUTF8ToBase64} from '../../src/global-middlewares/admin-middleware'
const settings_1 = require("../../src/settings");
//готовые данные для переиспользования в тестах
exports.codedAuth = (0, admin_middleware_1.fromUTF8toBase64)(settings_1.SETTINGS.ADMIN);
const createString = (length) => {
    let s = '';
    for (let x = 1; x <= length; x++) {
        s += x % 10;
    }
    return s;
};
exports.createString = createString;
exports.blog1 = {
    id: new Date().toISOString() + Math.random(),
    name: 'n1',
    description: 'd1',
    websiteUrl: 'http://example.com'
}; //dataset нельзя изменять
exports.blog7 = {
    id: new Date().toISOString() + Math.random(),
    name: 'n7',
    description: 'd7',
    websiteUrl: 'http://example7.com'
};
exports.post1 = {
    id: new Date().toISOString() + Math.random(),
    title: 't1',
    content: 'c1',
    shortDescription: 's1',
    blogId: exports.blog1.id,
    // blogName: 'n1'
};
exports.post7 = {
    id: new Date().toISOString() + Math.random(),
    title: 't7',
    content: 'c7',
    shortDescription: 's7',
    blogId: exports.blog7.id,
    // blogName: 'n7'
};
exports.dataset1 = {
    blogs: [exports.blog1],
    posts: []
};
exports.dataset2 = {
    blogs: [exports.blog1, exports.blog7],
    posts: [exports.post1]
};
