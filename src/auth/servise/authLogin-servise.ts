import { randomUUID } from "crypto";
import { IdType } from "../../users/types/user-types";
import { UserRepository } from "../../users/repository/userMongoRepository";
import { bcryptServise } from "../../domain/hashServise";
import { Result } from "../../comments/types/comment-types";
import { ResultStatus } from "../../input-uotput-types/resultCode";
import { InputAuthType, NewPasswordInputType } from "../types/auth-types";
import { jwtServise } from "../../domain/jwt-servise";
import { ObjectId } from "mongodb";
import { IpControlRepository } from "../../security/repository/ipRepository";
import { injectable, inject } from 'inversify'
import { nodemailerService } from "../../common/adapters/nodemailer-adapter";
import { newPasswordSuccess, passwordRecoveryEmailTemplate } from "../../common/email-templates/passwordRecoveryCodeEmail";


@injectable()
export class LoginServise {
    constructor(@inject(IpControlRepository) protected ipControlRepository: IpControlRepository,
        @inject(UserRepository) protected userRepository: UserRepository) {

    }

    async loginUser(input: InputAuthType, title: string, ip: string): Promise<Result<string | null>> {
        try {
            const user = await this.userRepository.findByEmailOrLogin(input.loginOrEmail)

            if (user === null) {
                return {
                    status: ResultStatus.BadRequest,
                    extensions: [{ field: "code", message: 'Failed to send confirmation email pasword' }],
                    data: null
                }
            }
            const checkPassword = await bcryptServise.checkPassword(input.password, user.passwordHash)

            if (!checkPassword) {
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
            console.log(decoded.deviceId + 'decoded in decode')
            const dataForSession = {
                ip: ip,
                title: title,
                user_id: jwtPayload.id,
                deviceId: jwtPayload.deviceId,
                lastActiveDate: new Date(),
                iat: decoded.iat,
                exp: decoded.exp,
            }

            const makeSession = await this.ipControlRepository.saveIp(dataForSession)

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
    }

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

            const user = await this.userRepository.findUser(new ObjectId(userId));

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
    }

    async checkAndUpdateRefToken(refToken: string): Promise<Result<string | null>> {



        const payload = await jwtServise.verifyRefreshToken(refToken);
        if (!payload) {
            return {
                status: ResultStatus.Unauthorized,
                errorMessage: "Invalid token payload",
                data: null
            };
        }

        //const safeToken = await jwtRepository.findRefreshToken(payload)
        const session = await this.ipControlRepository.findSessionByIdAndDeviceId(payload)
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


        const user = await this.userRepository.findUser(new ObjectId(payload.id));

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
        const update = await this.ipControlRepository.refreshSession(updateData)
        if (update === null) {
            return {
                status: ResultStatus.Unauthorized,
                errorMessage: "User not founded",
                data: null,
            };
        }

        return {
            status: ResultStatus.Success,
            data: { token, refreshToken }
        }

    }
    async passwordRecovery(email: string) {
        const isUser = await this.userRepository.findByEmail(email)
        if (isUser) {
            const emailSent = await nodemailerService.sendEmail(
                isUser.email,
                isUser.emailConfirmation.confirmationCode,
                passwordRecoveryEmailTemplate
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
        } else {
            return {
                status: ResultStatus.Unauthorized,
                errorMesssge: "email not found",
                data: null
            }
        }
    }
    async newPassword(input: NewPasswordInputType) {
        const checkConfirmCode = await this.userRepository.findUserByConfirmationCode(input.recoveryCode)
        if (!checkConfirmCode) {
            return {
                status: ResultStatus.Unauthorized,
                errorMessage: "confirmationCode not found",
                data: null
            }
        }
        const newPasswordHash = await bcryptServise.generateHash(input.newPassword)
        const updatePass = await this.userRepository.updatePassword(input.newPassword, input.recoveryCode)
        if (!updatePass) {
            return {
                status: ResultStatus.BadRequest,
                data: null,
                extensions: [{ field: "pass", message: 'Failed to send confirmation pass' }],
            };
        } else {
            const emailSent = await nodemailerService.sendEmail(
                checkConfirmCode.email,
                input.newPassword,
                newPasswordSuccess
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
        }
    }
}