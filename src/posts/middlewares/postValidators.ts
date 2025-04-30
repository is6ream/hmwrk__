import { body, validationResult, param } from "express-validator"
import { NextFunction, Request, Response } from "express"
import { inputCheckErrorsMiddleware } from "../../global-middlewares/inputCheckErrorsMiddleware"
import { adminMiddleware } from "../../global-middlewares/admin-middleware"
import { blogsRepository } from "../../blogs/repositories/blogsRepository"
import { postRepository } from "../postsRepository"
//// title: string // max 30
// shortDescription: string // max 100
// content: string // max 1000
// blogId: string // valid


export const idValidation = param('id')
    .exists()
    .withMessage('ID is required') //проверка на наличие
    .isString()
    .withMessage('ID must be a string') //проверка что это строка
    .isMongoId()
    .withMessage('Incorrect format of ObjectId')//проверка на формат ObjectId

export const titleValidator = body('title').isString().withMessage('not string')
    .trim().isLength({ min: 1, max: 30 }).withMessage('more then 30 or 0')
export const shortDescriptionValidator = body('shortDescription').isString().withMessage('not string')
    .trim().isLength({ min: 1, max: 100 }).withMessage('more then 100 or 0')

export const contentValidator = body('content').isString().withMessage('not string')
    .trim().isLength({ min: 1, max: 1000 }).withMessage('more then 1000 or 0')

export const blogIdValidator = body('blogId').isString().withMessage('not string')
    .trim().custom(blogId => {
        const blog = blogsRepository.findById(blogId)
        // console.log(blog)
        return !!blog
    }).withMessage('no blog')

export const findPostValidator = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const post = await postRepository.findById(req.params.id)
    if (!post) {
        res
            .status(404)
            .json({})
        return
    }
    next()
}

export const postValidators = [
    adminMiddleware,
    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdValidator,
    inputCheckErrorsMiddleware,
    idValidation
]