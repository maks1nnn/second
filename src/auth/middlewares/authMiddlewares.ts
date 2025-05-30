import {Request, Response, NextFunction} from 'express'
//import {SETTINGS} from '../settings'
export const ADMIN_AUTH = 'admin:qwerty' // get from SETTINGS


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string // 'Basic xxxx'
    console.log(auth)
    if (!auth) {
        res
            .status(401)
            .send('not found')
        return
    }
    const buff = Buffer.from(auth.slice(6), 'base64')
    const decodedAuth = buff.toString('utf8')
 
    const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
    const codedAuth = buff2.toString('base64')
 
   //if (decodedAuth === ADMIN_AUTH || auth.slice(0, 5) !== 'Basic ') {
    if (auth.slice(6) !== codedAuth ) {
        res
            .status(401)
            .send('invalid')
        return
    }
 
    next()
}