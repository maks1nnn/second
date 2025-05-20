/*import{ MongoMemoryServer} from 'mongodb-memory-server-core'
import { db } from '../../../../src/db/mongo-db'
 
import {authServise} from '../../../../src/auth/servise/auth-servise'
import { nodemailerService } from '../../../../src/common/adapters/nodemailer-adapter'
import { ResultStatus } from '../../../../src/input-uotput-types/resultCode'
import { userRepository } from '../../../../src/repositories/userMongoRepository'
import { randomUUID } from 'crypto'
import { Result } from '../../../../src/comments/types/comment-types'*/
import MongoMemoryServer from 'mongodb-memory-server-core'
import { authServise } from '../../../../src/auth/servise/authRegister-servise'
import { InputUserType } from '../../../../src/users/types/user-types'
import { testSeeder } from '../../../e2e/utils/test.seederForUsers'
import { Db, MongoClient } from 'mongodb'
import { emailServiceMock } from '../../../e2e/utils/mocks/EmailServicemocks'
import { nodemailerService } from '../../../../src/common/adapters/nodemailer-adapter'
import { ResultStatus } from '../../../../src/input-uotput-types/resultCode'
import {db} from './../../../e2e/helpers/db'
import {SETTINGS} from './../../../../src/settings'

describe("integration test for AuthTest",   () => {
    let mongoServer: MongoMemoryServer;
    let connection: MongoClient;
     
    beforeAll(async () => {
        const mongoServer: MongoMemoryServer = await MongoMemoryServer.create()
        SETTINGS.MONGO_URL = mongoServer.getUri();
        await db.run()
    })
    afterAll(async () => {
        await db.stop();
    })
    beforeEach(async () => {
        await db.drop();
    })
     
     

    const registerUserCase = authServise.registrationUser

    nodemailerService.sendEmail = emailServiceMock.sendEmail

    
        it.skip("should return ", async () => {

            const { login, email, password } = testSeeder.createUserDto()
            const result = await registerUserCase({ login, email, password })

            expect(result).toEqual( {
                status: ResultStatus.Success,
                data: null 
            })
        })







    })
 

/*describe('user registration', () => {
    const registrationUserCase = authServise.registrationUser

    nodemailerService.sendEmail = jest.fn().mockImplementation(async(recipient:string,code: string,emailTemplate:string):Promise<boolean> => true)

    beforeAll(async () => {
        const mongoServer: MongoMemoryServer = await MongoMemoryServer.create()
        await db.run(mongoServer.getUri())
    })

    afterAll(async () => {
        await db.stop()
    })

    beforeEach(async () => {
        await db.drop()
        jest.resetAllMocks()
    })

    it('should register user with correct data', async () => {
        const userDTO = testSeeder.createUserDto()

        const result  = await registrationUserCase(userDTO)

        expect(result.status).toBe(ResultStatus.Success)
        expect(result.data).toBeNull()
    })

})*/