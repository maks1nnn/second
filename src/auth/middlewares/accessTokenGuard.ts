import { NextFunction, Request, Response } from "express"
import { LoginServise } from "../servise/authLogin-servise";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { IdType } from "../../users/types/user-types";
import { IpControlRepository } from "../../security/repository/ipRepository";
import { UserRepository } from "../../users/repository/userMongoRepository";

const loginServise = new LoginServise(new IpControlRepository(),
                                        new UserRepository())

export const accessTokenGuard = async (req: Request,
    res: Response,
    next: NextFunction) => {
    if (!req.headers.authorization) return res.sendStatus(401);

    const result = await loginServise.checkAccessToken(req.headers.authorization)

    if (result.status === ResultStatus.Success && result.data !== null) {
        req.userId = result.data.id as string
        return next()
    }

    return res.sendStatus(401)
}