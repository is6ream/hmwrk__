"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataset1 = exports.post7 = exports.post1 = exports.blog7 = exports.blog1 = exports.createString = void 0;
//готовые данные для переиспользования в тестах
// export const codedAuth = fromUTF8ToBase64(SETTINGS.ADMIN) что за админ?
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
    blogName: 'n1'
};
exports.post7 = {
    id: new Date().toISOString() + Math.random(),
    title: 't7',
    content: 'c7',
    shortDescription: 's7',
    blogId: exports.blog7.id,
    blogName: 'n7'
};
exports.dataset1 = {
    blogs: [exports.blog1, exports.blog7],
    posts: [exports.post1, exports.post7]
};
//можно добавить еще dataset..
