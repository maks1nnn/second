import { randomUUID } from "crypto";
import { add } from "date-fns";
import { UserDBType } from "../../db/user-db-types";
import { InputUserType, UserValidationRules } from "../../input-uotput-types/user-types";
import { userRepository } from "../../repositories/userMongoRepository";
import { bcryptServise } from "../../domain/hashServise";
import { nodemailerService } from "../../common/adapters/nodemailer-adapter"; 
import { Result } from "../../input-uotput-types/comment-types";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { InputAuthType } from "../types/auth-types";
import { jwtServise } from "../../domain/jwt-servise";
import { registrationEmailTemplate } from "../../common/email-temp;ates/registrationEmailTemplate";




export const authServise = {

    async registrationUser(input: InputUserType): Promise<Result<null| object| boolean>> {
        const userByEmail = await userRepository.findByEmail(input.email)
        if (userByEmail) {
            return {
                status: ResultStatus.BadRequest,
                data: null
            }
        }
        const userByLogin = await userRepository.findByLogin(input.login)
        if (userByLogin) {
            return {
                status: ResultStatus.BadRequest,
                data: null
            }
        }
        const passwordHash = await bcryptServise.generateHash(input.password)

        const newUser: UserDBType = {
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
                errorMessage: 'Failed to send confirmation email',
            };
        }


        return {
            status: ResultStatus.Success,
            data: null
        }

    },

    async confirmRegistration(input: string): Promise<Result<null | boolean>> {
        const isUser = await userRepository.findUserByConfirmationCode(input)
        if (!isUser) {
            return {
                status: ResultStatus.BadRequest,
                extensions: [{ field: 'code', message: 'invalid confirmation code' }],
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

        await userRepository.updateUserIsConfirmed(isUser._id, isConfirmed)

        return {
            status: ResultStatus.Success,
            data: null
        }
    },

    async registrationEmailResending(input: string): Promise<Result> {
        const isUser = await userRepository.findByEmail(input)
        if (!isUser) {
            return {
                status: ResultStatus.BadRequest,
                extensions: [{ field: 'email', message: 'Email already confirmed' }],
                data: null
            }
        }

        if (isUser.emailConfirmation.isConfirmed) {
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



        await userRepository.updateUserConfirmInfo(isUser._id, newConfirmationCode, newExpirationDate)

        await nodemailerService.sendEmail(
            input,
            newConfirmationCode,
            registrationEmailTemplate 
        )

        return {
            status: ResultStatus.Success,
            data: null
        }
    },

    async loginUser(input: InputAuthType): Promise<Result<string|null>> {
        const user = await userRepository.findByEmailOrLogin(input.loginOrEmail)
        if (!user || !(await bcryptServise.checkPassword(input.password, user.passwordHash))) {
            return {
                status: ResultStatus.BadRequest,
                data: null
            }
        }
         
        if (!user.emailConfirmation.isConfirmed) {
            return {
                status: ResultStatus.BadRequest,
                data: null
            }
        }


        const jwtPayload =  user._id.toString()
        
        const token: string = await jwtServise.createToken(jwtPayload)

        return {
            status: ResultStatus.Success,
            data: token
        }
    },
}


















    







    











