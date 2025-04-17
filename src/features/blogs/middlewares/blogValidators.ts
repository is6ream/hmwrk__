import { body, validationResult, param } from 'express-validator'
import { inputCheckErrorsMiddleware } from '../../../global-middlewares/inputCheckErrorsMiddleware'
import { NextFunction, Request, Response } from 'express'
import { adminMiddleware } from '../../../global-middlewares/admin-middleware'
import { blogsRepository } from '../blogsRepository'


// name: string // max 15
// description: string // max 500
// websiteUrl: string // max 100 ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$

export const idValidation = param('id')
    .exists()
    .withMessage('ID is required') //проверка на наличие
    .isString()
    .withMessage('ID must be a string') //проверка что это строка
    .isMongoId()
    .withMessage('Incorrect format of ObjectId')//проверка на формат ObjectId


export const nameValidator = body('name').isString().withMessage('not string')
    .trim().isLength({ min: 1, max: 15 }).withMessage('more then 15 or 0')

export const descriptionValidator = body('description').isString().withMessage('not string')
    .trim().isLength({ min: 1, max: 500 }).withMessage('more then 500 or 0')

export const websiteUrlValidator = body('websiteUrl').isString().withMessage('not string')
    .trim().isURL().withMessage('not url')
    .isLength({ min: 1, max: 100 }).withMessage('more then 100 or 0')

export const findBlogValidator = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const blog = await blogsRepository.findById(req.params.id)
    if (!blog) {
        res
            .status(404)
            .json({})
        return
    }
    next()
}




export const blogValidators = [
    adminMiddleware,
    nameValidator,
    descriptionValidator,
    websiteUrlValidator,
    inputCheckErrorsMiddleware
]