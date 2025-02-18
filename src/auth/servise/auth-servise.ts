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
import  jwt from "jsonwebtoken";


export const authServise = {

    async registrationUser(input: InputUserType): Promise<Result<null | object | boolean>> {
        const userByEmail = await userRepository.findByEmail(input.email)
        if (userByEmail) {
            return {
                status: ResultStatus.BadRequest,
                extensions: [{ field: "email", message: "This email already exists in database" }],
                data: null
            }
        }
        const userByLogin = await userRepository.findByLogin(input.login)
        if (userByLogin) {
            return {
                status: ResultStatus.BadRequest,
                extensions: [{ field: "login", message: "this login already exists in database" }],
                data: null
            }
        }
        const passwordHash = await bcryptServise.generateHash(input.password)

        const newUser = {
            login: input.login,
            email: input.email,
            passwordHash,
            createdAt: (new Date()).toISOString(),
            emailConfirmation: {
                confirmationCode: randomUUID(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 30,
                }),
                isConfirmed: false,
            },

        };

        await userRepository.createUser(newUser);

        const emailSent = await nodemailerService.sendEmail(
            newUser.email,
            newUser.emailConfirmation.confirmationCode,
            registrationEmailTemplate
        );

        if (!emailSent) {
            return {
                status: ResultStatus.BadRequest,
                data: null,
                extensions: [{ field: "email", message: 'Failed to send confirmation email' }],
            };
        }


        return {
            status: ResultStatus.Success,
            data: null
        }

    },

    async confirmRegistration(input: string): Promise<Result<null | boolean>> {
        const isUser = await userRepository.findUserByConfirmationCode(input)
        if (isUser === false) {
            return {
                status: ResultStatus.BadRequest,
                extensions: [{ field: 'code', message: 'invalid confirmation code sorry' }],
                data: null
            }
        }

        if (isUser.emailConfirmation.expirationDate < (new Date().toISOString())) {
            return {
                status: ResultStatus.BadRequest,
                extensions: [{ field: 'code', message: 'Confirmation code has expired' }],
                data: null,
            }
        }

        if (isUser.emailConfirmation.isConfirmed) {
            return {
                status: ResultStatus.BadRequest,
                extensions: [{ field: 'code', message: 'user account already confirmed' }],
                data: null,
            }
        }

        const isConfirmed: boolean = true

        const updateConfirm = await userRepository.updateUserIsConfirmed(isUser._id, isConfirmed)
        if (!updateConfirm) {
            return {
                status: ResultStatus.BadRequest,
                extensions: [{ field: 'code', message: 'database not work' }],
                data: null,
            }
        }
        return {
            status: ResultStatus.Success,
            data: null
        }
    },

    async registrationEmailResending(email: string): Promise<Result> {
        const isUser = await userRepository.findByEmail(email)
        if (!isUser) {
            return {
                status: ResultStatus.BadRequest,
                extensions: [{ field: 'email', message: 'Email not exist' }],
                data: null
            }
        }
        const userConfirm = isUser.emailConfirmation.isConfirmed
        console.log(userConfirm)
        if (userConfirm === true) {
            return {
                status: ResultStatus.BadRequest,
                extensions: [{ field: 'email', message: 'Email already confirmed' }],
                data: null
            }
        }

        const newConfirmationCode = randomUUID();
        const newExpirationDate = add(new Date(), {
            hours: 1,
            minutes: 30,
        })



        const newCode = await userRepository.updateUserConfirmInfo(isUser._id, newConfirmationCode, newExpirationDate)
        if (!newCode)
            return {
                status: ResultStatus.BadRequest,
                data: null,
                extensions: [{ field: "code", message: "this code already exists in database" }],
            };


        const emailSent = await nodemailerService.sendEmail(
            email,
            newConfirmationCode,
            registrationEmailTemplate
        )

        if (!emailSent) {
            return {
                status: ResultStatus.BadRequest,
                data: null,
                extensions: [{ field: "email", message: 'Failed to send confirmation email' }],
            };
        }

        return {
            status: ResultStatus.Success,
            data: null
        }
    },

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

        /* if (user.emailConfirmation.isConfirmed === false) {
             return {
                 status: ResultStatus.Forbidden,
                 extensions:[{field: "code", message:'Failed to send confirmation email'}],
                 data: null
             }
         }*/


        const jwtPayload = user._id.toString()

        const token: string = await jwtServise.createToken(jwtPayload)
        const refreshToken: string = await jwtServise.createRefreshToken(jwtPayload)




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
            const { userId } = payload;

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
       
        try{
         
            try{const payload = await jwtServise.verifyRefreshToken(refToken)
                if (payload === null){
                    return {
                        status: ResultStatus.Unauthorized,
                        errorMessage: "token not good",
                        data: null,
                    }
            }}catch (err){
                if(err instanceof jwt.TokenExpiredError){
                    return {
                        status: ResultStatus.Unauthorized,
                        errorMessage: 'token expired',
                        data: null
                    }        
                }
                if(err instanceof jwt.JsonWebTokenError){
                    return {
                        status: ResultStatus.Unauthorized,
                        errorMessage: 'bad token',
                        data:null
                    }
                }
                throw err
            }
         
            const payloaad = await jwtServise.verifyRefreshToken(refToken)
       
        
            console.log('hanting ', payloaad)
         
            const { userId } = payloaad;

            /*const user = await userRepository.findUser(new ObjectId(userId));

            if (!user) {
                return {
                    status: ResultStatus.Unauthorized,
                    errorMessage: "User not found",
                    data: null,
                };
            }*/

            const token: string = await jwtServise.createToken(userId)
            const refreshToken: string = await jwtServise.createRefreshToken(userId)




            return {
                status: ResultStatus.Success,
                data: { token, refreshToken }
             


        }
         }catch (err){
            console.error(err)
            return {
                status: ResultStatus.Unauthorized,
                errorMessage: "1token not good",
                data: null,
            }
         }
    },
}