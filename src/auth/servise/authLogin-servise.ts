import { randomUUID } from "crypto";
import { add } from "date-fns";
import { UserDBType } from "../../db/user-db-types";
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
import { Request, Response } from "express"
import jwt from "jsonwebtoken";
import { jwtRepository } from "../../repositories/jwt-repositories";
import { Console } from "console";




export const loginServise = {



async loginUser(input: InputAuthType): Promise<Result<string | null>> {
    const user = await userRepository.findByEmailOrLogin(input.loginOrEmail)
    if (user !== null) { console.log("userLOGIN: " + user.login) }
    if (user !== null) { console.log("userLOGIN: " + user.emailConfirmation.isConfirmed) }
    if (user === null || !(await bcryptServise.checkPassword(input.password, user.passwordHash))) {
        return {
            status: ResultStatus.BadRequest,
            extensions: [{ field: "code", message: 'Failed to send confirmation email pasword' }],
            data: null
        }
    }


    console.log(user)

    const jwtPayload = user._id.toString()

    const token: string = await jwtServise.createToken(jwtPayload)
    const refreshToken: string = await jwtServise.createRefreshToken(jwtPayload)

    const inputData = {
        id: jwtPayload,
        token: refreshToken
    };
    const isJwt = await jwtRepository.saveRefreshToken(jwtPayload, refreshToken)

    return {
        status: ResultStatus.Success,
        data: { token, refreshToken }
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
        if (!payload) {
            return {
                status: ResultStatus.Unauthorized,
                errorMessage: "Invalid token payload",
                data: null
            };
        }



        const safeToken = await jwtRepository.findRefreshToken(payload)

        if (safeToken === null) {
            return {
                status: ResultStatus.Unauthorized,
                errorMessage: 'bad old token',
                data: null
            }
        }
        console.log('!!!! ', refToken)
        console.log('2222 ', safeToken)
        if (refToken !== safeToken) {
            return {
                status: ResultStatus.Unauthorized,
                errorMessage: "token   invalid",
                data: null,
            }
        }


        console.log('hanting ', payload)

        const userId = payload;
        console.log(userId + 'Failed')
        const user = await userRepository.findUser(new ObjectId(userId));

        if (user === null) {
            return {
                status: ResultStatus.Unauthorized,
                errorMessage: "User not found",
                data: null,
            };
        }

        const token: string = await jwtServise.createToken(userId)
        const refreshToken: string = await jwtServise.createRefreshToken(userId)


        const remove = await jwtRepository.saveRefreshToken(payload, refreshToken)



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