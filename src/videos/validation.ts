import { InputVideoType } from './../input-output-types/video-types';
import { OutputErrorsType } from './types'
import { RESOLUTIONS, RESOLUTIONSstring } from './../input-output-types/video-types';

export const inputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }
    if (!video.title || video.title.trim().length === 0 || typeof video.title !== 'string' || video.title.length > 40) {
        errors.errorsMessages.push({ message: "error!!!", field: "title" })
    }
    if (!video.author || video.author.trim().length === 0 || typeof video.author !== 'string' || video.author.length > 20) {
        errors.errorsMessages.push({ message: "error!!!", field: "author" })
    }
    if (!Array.isArray(video.availableResolutions) ||
        video.availableResolutions.find((p: RESOLUTIONSstring) => !RESOLUTIONS[p as keyof typeof RESOLUTIONS])) {
        errors.errorsMessages.push({ message: "error!!!", field: "availableResolutions" })
        console.log(errors)
    }
    return errors;
}


export const putInputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }
    if (!video.title || video.title.trim().length === 0 || typeof video.title !== 'string' || video.title.length > 40) {
        errors.errorsMessages.push({ message: "error!!!", field: "title" })
    }
    if (!video.author || video.author.trim().length === 0 || typeof video.author !== 'string' || video.author.length > 20) {
        errors.errorsMessages.push({ message: "error!!!", field: "author" })
    }
    if (!Array.isArray(video.availableResolutions) ||
        video.availableResolutions.find((p: RESOLUTIONSstring) => !RESOLUTIONS[p as keyof typeof RESOLUTIONS])) {
        errors.errorsMessages.push({ message: "error!!!", field: "availableResolutions" })
        console.log(errors)
    }
    if (typeof video.canBeDownloaded !== 'boolean') {
        errors.errorsMessages.push({ message: "error!!!", field: "canBeDownloaded" })
    }
    if (video.minAgeRestriction !== undefined && (typeof video.minAgeRestriction !== 'number' || video.minAgeRestriction < 1 || video.minAgeRestriction > 18)) {
        errors.errorsMessages.push({ message: "error!", field: "minAgeRestriction" })
    }
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    //остановился на том, что составил регулярное выражение по шаблону и проверяю входные данные. Без этой проверки была 1 ошибка, теперь 3
    if (!video.publicationDate ||
        typeof video.publicationDate !== 'string' || !video.publicationDate.match(iso8601Regex)) {
        // 
        errors.errorsMessages.push({ message: "error!!!", field: "publicationDate" })
    }
    return errors;
}