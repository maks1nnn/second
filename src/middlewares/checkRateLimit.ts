import {Request, Response, NextFunction} from 'express'
import { rateRepository } from '../repositories/rateMongo-repositiries'

export const checkRateLimit = async (req:Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl
    const ip = req.ip || 'djondow'
    const date = new Date(Date.now())
    const checkdate = new Date(Date.now() - 10000)

    const inputData = {
        ip: ip,
        url: url,
        date: date
    }

    const saveIp = await rateRepository.saveUrlLimit(inputData)
    const checkCount  = await rateRepository.findUrlLimit(ip, url, checkdate)
    
    if (checkCount   >= 6){
         res.status(429).send()
         return
    } else {
        next()}
}