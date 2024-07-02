import { randomUUID } from "crypto";


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
    createUserDtos(count: number){
        const users = [];

        for(let i = 0; i <= count; i++){
            users.push({
                login: 'test' + i,
                email: `test$(i)@gmail.com`,
                pass: '12345678'
            })
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
): Promise<IUUserService> {
    const newUser : IUserDb = {
        login,
        email,
        passwordHash: pass,
        createdAt: new Date(),
        emailConfirmation: {
            confirmationCode: code?? randomUUID(),
            expirationDate: expirationDate ?? addEventListener(new Date(), {
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
