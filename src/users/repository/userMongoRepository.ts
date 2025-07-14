import { ObjectId } from "mongodb"
import { UserModel } from "../../db/mongo-db"
import { UserDBType } from "../../db/user-db-types";
import { UserValidationRules } from "../types/user-types";
import { injectable } from 'inversify'



@injectable()
export class UserRepository {

    async createUser(inputData: any) {

        const insertInfo = await UserModel.insertMany(inputData)
        if (insertInfo) {
            return insertInfo.map(doc => doc._id)// Возвращаем ID созданного пользователя
        } else { return null }
    }

    async findUser(id: ObjectId) {
        const user = await UserModel.findOne({ _id: id })
        if (user) {
            return user
        } else { return null }
    }

    async deleteUser(id: ObjectId) {
        const result = await UserModel.deleteOne({ _id: id })
        return result.deletedCount === 1
    }

    async findByLogin(data: string) {
        const checkUser = await UserModel.findOne({ login: data });
        if (checkUser) {
            return checkUser
        }
        else { return false }
    }


    async findByEmail(data: string) {
        const checkUser = await UserModel.findOne({ email: data })
        if (checkUser) {
            return checkUser
        } else { return false }
    }

    async findUserByConfirmationCode(code: string) {

        const user = await UserModel.findOne({ "emailConfirmation.confirmationCode": code })

        if (user) {
            return user
        } else {
            return false
        }
    }

    async updateUserIsConfirmed(id: ObjectId, confirm: boolean) {
        const result = await UserModel.updateOne({ _id: id }, {
            $set: {
                "emailConfirmation.isConfirmed": confirm,
            }
        })
        return result.modifiedCount === 1
    }

    async updateUserConfirmInfo(id: ObjectId, confirmCode: string, confirmDate: Date) {
        const result = await UserModel.updateOne({ _id: id }, {
            $set: {
                "emailConfirmation.confirmationCode": confirmCode,
                "emailConfirmation.expirationDate": confirmDate,
            }
        })
        return result.modifiedCount === 1
    }

    async findByEmailOrLogin(loginOrEmail: string) {

        const user = await UserModel.findOne({
            $or: [{ login: loginOrEmail }, { email: loginOrEmail }]
        });
        if (user) {
            return user
        } else {
            return null
        }
    }
    async updatePassword(newPassword:string,email:string){
        const user = await UserModel.updateOne({ email: email },{
            $set: {
                "passwordHash": newPassword
            }
        })
        if(user){
            return user
        }else{
            return null
        }
    }


}

 