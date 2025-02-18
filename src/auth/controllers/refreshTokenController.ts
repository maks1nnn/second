import { Request, Response } from "express"
import { authServise } from "../servise/auth-servise"
import { ResultStatus } from "../../input-uotput-types/resultCode"
export const refreshTokenController = async (req: Request, res: Response) => {
    try {
        console.log('TokenQQQ', req.cookies.refreshToken)
        const result = await authServise.checkAndUpdateRefToken(req.cookies.refreshToken)
        if (result.status === ResultStatus.Unauthorized) {
            res.status(401).send(result.errorMessage)
        }

        if (result.status === ResultStatus.Success) {
            const { token, refreshToken } = result.data!;

            res
                .cookie('refreshToken', refreshToken, {
                    httpOnly: true, // Защищает от XSS атак
                    secure: true,
                })
                .status(200)
                .send({
                    accessToken: token
                })
        }


    } catch (err) {
        console.log(err)
        res.status(502).send()
    }

}