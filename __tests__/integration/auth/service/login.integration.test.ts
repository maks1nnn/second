import MongoMemoryServer from 'mongodb-memory-server-core'
import {  MongoClient } from 'mongodb'
import { ResultStatus } from '../../../../src/input-uotput-types/resultCode'
import {db} from './../../../e2e/helpers/db'
import {SETTINGS} from './../../../../src/settings'
import {loginServise} from './../../../../src/auth/servise/authLogin-servise'
import { checkEmailOrLoginMock } from '../../../e2e/utils/mocks/checkEmailOrLoginMocks'
import { userRepository } from '../../../../src/repositories/userMongoRepository'
import { checkPasswordMock } from '../../../e2e/utils/mocks/bcryptServceMock'
import { bcryptServise } from '../../../../src/domain/hashServise'
 

describe("registration  test for LoginTest",   () => {
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
     
  const loginUserCase = loginServise.loginUser
  userRepository.findByEmailOrLogin = checkEmailOrLoginMock.findByEmailOrLogin
  bcryptServise.checkPassword = checkPasswordMock.checkPassword
  
    it('should return tokens', async () => {
        const loginOrEmail = 'user1'
        const password = 'password'
        const input = {loginOrEmail: loginOrEmail,
        password: password}
        const title = 'title'
        const ip = 'ip'  

        const result = await loginUserCase(input, title, ip)

        expect(result).toEqual(
            {status: ResultStatus.Success,
                data: {
                    token: expect.any(String),
                    refreshToken: expect.any(String)
                 }}
        )
    })
})
     
