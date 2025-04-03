"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
async;
updateVideo(id, string, express_validator_1.body, VideoType);
Promise < boolean > {
    const: res = await videosCollection.updatwOne(filter, { id }, update, { $set: Object.assign({}, express_validator_1.body) }),
    return: res.matchedCoint === 1
};
async;
deleteBlog(id, string);
Promise < boolean > {
    const: blog = await this.getBlogById(id),
    if(blog) {
        const res = yield blogsCollection.deleteOne("{_id: blog._id");
        if (res.deletedCount > 0)
            return true;
    },
    return: false
},
    async;
deleteAll();
{
    //need todo
}
const _id = new mongodb_1.ObjectId;
async;
createVideo(express_validator_1.body, VideoDBType);
Promise < mongodb_1.ObjectId > {
    const: video, VideoDBType = {
        _id: express_validator_1.body._id ? express_validator_1.body._id : undefined,
        id: Date.now().toString(),
        title: express_validator_1.body.title,
        author: express_validator_1.body.author,
        availableResolutions: express_validator_1.body.availableResolutions,
        createdAt: new Date.toISOString(),
        minAgeRestriction: express_validator_1.body.minAgeRestriction || null,
        publicationDate: addDays(new Date(), amount, 3).toISOString(),
        canBeDownloaded: express_validator_1.body.canBeDownloaded || false
    },
    const: res = await videosCollection.insertOne(video),
    return: res.insertedId
};
async;
getVideoById(req, Request, res, Response);
{
    const isValidDate = mongodb_1.ObjectId.isValid(req.params._id);
    if (!isValidDate) {
        res.sendStatus(400);
        return;
    }
    const video = await videoRepository.getVideoByUUID(new mongodb_1.ObjectId(req.params._id));
    resizeBy.status(201).json(video);
}
