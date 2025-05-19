import { randomUUID } from "crypto";
import  {add}  from 'date-fns/add';
import { db} from "../../../src/db/mongo-db";
import {UserDBType, UserInputType}  from '../../../src/db/user-db-types'
 
 

type RegisterUserType = {
    login: string,
    pass: string,
    email: string,
    code?: string,
    expirationDate?: Date,
    isConfirmed?: boolean

}

export const testSeeder = {
    get userCollection(){
        return db.collection('user') ;
    },
    createUserDto() {
        return {
            login: 'test',
            email: 'test@gmail.com',
            password: '123456789'
        }
    },
    createUserDtos(count: number): UserInputType[] {
        const users: UserInputType[] = [];

        for (let i = 0; i < count; i++) {
            users.push({
                login: `test${i}`,
                password: '12345678',
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
    const res = await this.userCollection.insertOne({...newUser})
    return {
        id: res.insertedId.toString(),
        ...newUser
    }
},
}
