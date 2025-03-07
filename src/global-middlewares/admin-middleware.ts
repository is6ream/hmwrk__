import { Response, Request, NextFunction } from "express";
import { SETTINGS } from '../settings'
import { error } from "console";

export const fromBase64ToUTF8 = (code: string) => {
    const buff = Buffer.from(code, 'base64')
    const decodedAuth = buff.toString('utf8')
    return decodedAuth
}

export const fromUTF8toBase64 = (code: string) => {
    const buff2 = Buffer.from(code, 'utf8')
    const codedAuth = buff2.toString('base64')
    return codedAuth
}

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string
    console.log(auth)
    if (!auth) {
        res
            .status(401)
            .json({error: "Unauthorized!"})
        return
    }
    if(auth.slice(0,6) !== 'Basic '){
        res
        .status(401)
        .json({error: "Unathorized!"})
    }

    const codedAuth = fromUTF8toBase64(SETTINGS.ADMIN)
}