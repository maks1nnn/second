import { randomUUID } from "crypto";
import  {add}  from 'date-fns/add';
import { userCollection } from "../../../src/db/mongo-db";
import {UserDBType}  from '../../../src/db/user-db-types'
 


type RegisterUserType = {
    login: string,
    pass: string,
    email: string,
    code?: string,
    expirationDate?: Date,
    isConfirmed?: boolean

}

export const testSeeder = {
    createUserDto() {
        return {
            login: 'test',
            email: 'test@gmail.com',
            pass: '123456789'
        }
    },
    createUserDtos(count: number): RegisterUserType[] {
        const users: RegisterUserType[] = [];

        for (let i = 0; i < count; i++) {
            users.push({
                login: `test${i}`,
                pass: '12345678',
                email: `test${i}@gmail.com`,
            });
        }
        return users;
    },

async registerUser(
    {
        login,
        pass,
        email,
        code,
        expirationDate,
        isConfirmed,
    }: RegisterUserType
)  {
    const newUser  = {
        login,
        email,
        passwordHash: pass,
        createdAt: new Date(),
        emailConfirmation: {
            confirmationCode: code?? randomUUID(),
            expirationDate: expirationDate ?? add(new Date(), {
                minutes: 30,
            }),
            isConfirmed: isConfirmed ?? false
        }
    };
    const res = await userCollection.insertOne({...newUser})
    return {
        id: res.insertedId.toString(),
        ...newUser
    }
},
}
