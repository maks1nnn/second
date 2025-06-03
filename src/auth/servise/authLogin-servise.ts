import { randomUUID } from "crypto";
import { add } from "date-fns";

import { InputUserType, IdType, UserValidationRules } from "../../users/types/user-types";
import { userRepository } from "../../repositories/userMongoRepository";
import { bcryptServise } from "../../domain/hashServise";
import { nodemailerService } from "../../common/adapters/nodemailer-adapter";
import { Result } from "../../comments/types/comment-types";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { InputAuthType } from "../types/auth-types";
import { jwtServise } from "../../domain/jwt-servise";
import { registrationEmailTemplate } from "../../common/email-templates/registrationEmailTemplate";
import { InferIdType, ObjectId } from "mongodb";
import e, { Request, Response } from "express"
import jwt from "jsonwebtoken";
//import { jwtRepository } from "../../repositories/jwt-repositories";
import { Console } from "console";
import { ipControlRepository } from "../../security/repository/ipRepository";
import { decode } from "punycode";




export const loginServise = {

    async loginUser(input: InputAuthType, title: string, ip: string): Promise<Result<string | null>> {
        try {

            const user = await userRepository.findByEmailOrLogin(input.loginOrEmail)
          
             
            if (user === null || !(await bcryptServise.checkPassword(input.password, user.passwordHash))) {
                return {
                    status: ResultStatus.BadRequest,
                    extensions: [{ field: "code", message: 'Failed to send confirmation email pasword' }],
                    data: null
                }
            }

            const jwtPayload = {
                id: user._id.toString(),
                deviceId: randomUUID()
            }

            const token: string = await jwtServise.createToken(jwtPayload)
            const refreshToken: string = await jwtServise.createRefreshToken(jwtPayload)

            const decoded = await jwtServise.decodeToken(refreshToken)
             
            const dataForSession = {
                ip: ip,
                title: title,
                user_id: jwtPayload.id,
                deviceId: jwtPayload.deviceId,
                lastActiveDate: new Date(),
                iat: decoded.iat,
                exp: decoded.exp,
            }

            const makeSession = await ipControlRepository.saveIp(dataForSession)
             
            return {
                status: ResultStatus.Success,
                data: { token, refreshToken }
            }
        } catch (err) {
            console.log(err)
            return {
                status: ResultStatus.BadRequest,
                errorMessage: 'some wrong in login service',
                data: null
            }
        }
    },

    async checkAccessToken(authHeader: string): Promise<Result<IdType | null>> {
        const [schema, token] = authHeader.split(" ");

        if (schema !== "Bearer") {
            return {
                status: ResultStatus.Unauthorized,
                errorMessage: "Wrong auth",
                data: null,
            };
        }

        const payload = await jwtServise.verifyToken(token);

        if (payload) {
            const userId = payload;

            const user = await userRepository.findUser(new ObjectId(userId));

            if (!user) {
                return {
                    status: ResultStatus.Unauthorized,
                    errorMessage: "User not found",
                    data: null,
                };
            }

            return {
                status: ResultStatus.Success,
                data: { id: userId } as IdType, // Assuming userId is a string
            };
        }

        return {
            status: ResultStatus.Unauthorized,
            errorMessage: "Wrong auth",
            data: null,
        };
    },

    async checkAndUpdateRefToken(refToken: string): Promise<Result<string | null>> {

        try {

            const payload = await jwtServise.verifyRefreshToken(refToken);
            console.log(payload + ' see you soon')
            if (!payload) {
                return {
                    status: ResultStatus.Unauthorized,
                    errorMessage: "Invalid token payload",
                    data: null
                };
            }

            //const safeToken = await jwtRepository.findRefreshToken(payload)
            const session = await ipControlRepository.findSessionByIdAndDeviceId(payload)
            console.log(session + 'pokemon')
            if (session === null) {
                return {
                    status: ResultStatus.Unauthorized,
                    errorMessage: 'bad old token',
                    data: null
                }
            }

            if (payload.iat !== session.iat) {
                return {
                    status: ResultStatus.Unauthorized,
                    errorMessage: "token   invalid",
                    data: null,
                }
            }

            const userId = payload.id;
            const user = await userRepository.findUser(new ObjectId(userId));

            if (user === null) {
                return {
                    status: ResultStatus.Unauthorized,
                    errorMessage: "User not found",
                    data: null,
                };
            }
            const jwtPayload = {
                id: user._id.toString(),
                deviceId: session.deviceId
            }
            const token: string = await jwtServise.createToken(jwtPayload)
            const refreshToken: string = await jwtServise.createRefreshToken(jwtPayload)
            const decoded = await jwtServise.decodeToken(refreshToken)
            //const remove = await jwtRepository.saveRefreshToken(payload, refreshToken)

            const updateData = {
                id: jwtPayload.id,
                deviceId: jwtPayload.deviceId,
                iat: decoded.iat
            }
            const update = await ipControlRepository.refreshSession(updateData)
            if (update) {
                return {
                    status: ResultStatus.Unauthorized,
                    errorMessage: "User not found",
                    data: null,
                };
            }

            return {
                status: ResultStatus.Success,
                data: { token, refreshToken }
            }
        } catch (err) {
            console.error("FIRST" + err)
            return {
                status: ResultStatus.Unauthorized,
                errorMessage: "1token not good",
                data: null,
            }
        }
    },
}