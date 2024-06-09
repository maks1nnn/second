import { UserValidationRules } from "../input-uotput-types/user-types";
import { userRepository } from "../repositories/userMongoRepository";
import { bcryptServise } from "./hashServise";




export const authServise = {
    async checkUser(body: any) {
        if (UserValidationRules.loginPattern.test(body.loginOrEmail)) {
            const checkUser = await userRepository.findByLogin(body.loginOrEmail)

            if (checkUser) {
                return bcryptServise.checkPassword(body.password, checkUser)
            }
        } else if (UserValidationRules.emailPattern.test(body.loginOrEmail)) {
            const checkUser = await userRepository.findByEmail(body.loginOrEmail)

            if (checkUser) {
                return bcryptServise.checkPassword(body.password, checkUser)
            }
        } else { return null }
    }
}













