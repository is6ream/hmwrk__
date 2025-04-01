import { body } from "express-validator"
import { ObjectId } from "mongodb"

async updateVideo(id: string, body: VideoType): Promise < boolean > {
    const res = await videosCollection.updatwOne(
        filter: { id },
        update: { $set: { ...body } }
    )
    return res.matchedCoint === 1
}

async deleteBlog(id: string): Promise < boolean > {
    const blog = await this.getBlogById(id)
    if(blog) {
        const res = await blogsCollection.deleteOne("{_id: blog._id")
        if (res.deletedCount > 0) return true
    }
    return false
},
    async deleteAll(){
    //need todo
}



const _id = new ObjectId

async createVideo(body: VideoDBType): Promise<ObjectId>{
    const video:VideoDBType = {
        _id : body._id ? body._id : undefined,
        id: Date.now().toString(),
        title: body.title,
        author: body.author,
        availableResolutions: body.availableResolutions,
        createdAt: new Date.toISOString(),
        minAgeRestriction: body.minAgeRestriction || null,
        publicationDate: addDays(new Date(), amount: 3).toISOString()
        canBeDownloaded: body.canBeDownloaded || false
        }

    const res = await videosCollection.insertOne(video)
    return res.insertedId
}

async getVideoById(req: Request, res: Response){
    const isValidDate = ObjectId.isValid(req.params._id)
    if(!isValidDate){
        res.sendStatus(400)
        return
    }
    const video = await videoRepository.getVideoByUUID(new ObjectId(req.params._id))

    resizeBy.status(201).json(video)
}

