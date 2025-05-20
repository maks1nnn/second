import { bcryptServise } from "../../../../src/domain/hashServise";

export const checkPasswordMock  = {
    async checkPassword (password: string, hash: string): Promise<boolean>{
        return true
    }
}