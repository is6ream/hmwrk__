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
const mongodb_1 = require("mongodb");
const mongo_1 = require("./../../db/mongo");
//...
//подготовка бд к тестам
const post = [
    { title: 'x4' },
    { title: 'x5' }
];
function testDB() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongo_1.postsCollection.drop();
        const info = yield mongo_1.postsCollection.insertMany([{ title: 'x1' }, { title: 'x2' }]);
        const insertedInfo = yield mongo_1.postsCollection.insertMany(post)(yield mongo_1.postsCollection
            .find({ title: 'xxx' }, { projection: { title: 1, _id: 0 } })
            .toArray());
        yield mongo_1.postsCollection.findOne({ _id:  });
        yield mongo_1.postsCollection.updateOne({ _id: insertedInfo.insertedId }, {
            $set: { title: 'x4' }
        });
        //осьтановился на разборе этого участка кода
        yield mongo_1.postsCollection.deleteOne({ _id: insertedInfo.insertedId });
        new mongodb_1.ObjectId(req.params.id);
        createdInfo.id.toString();
    });
}
