import { Db, MongoClient } from 'mongodb'
import { db } from './../e2e/helpers/db'
import { req } from '../helpers/req'
import { SETTINGS } from '../../src/settings'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import { loginServise } from '../../src/auth/servise/authLogin-servise'
import { checkEmailOrLoginMock } from './utils/mocks/checkEmailOrLoginMocks'
import { checkPasswordMock } from './utils/mocks/bcryptServceMock'
import { userRepository } from '../../src/repositories/userMongoRepository'
import { bcryptServise } from '../../src/domain/hashServise'
import { app } from '../../src/app'
import { addRoutes } from './../../src/routes/routes'
import { connectionToDB } from '../../src/db/mongo-db'
import request from 'supertest'
const getRequest = () => {
    return request(app)
}
addRoutes(app)

describe('security test', () => {
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
    const mockNext = jest.fn();

    const loginUserCase = loginServise.loginUser
    userRepository.findByEmailOrLogin = checkEmailOrLoginMock.findByEmailOrLogin
    bcryptServise.checkPassword = checkPasswordMock.checkPassword

    it('should return session', async () => {
        const loginOrEmail = 'user1'
        const password = 'password'
        const input = {loginOrEmail: loginOrEmail,
        password: password}
        const title = 'title'
        const ip = 'ip'  

        const result = await loginUserCase(input, title, ip)
        const session = await getRequest().get(`${SETTINGS.PATH.SECURITY}/`)
        .set('Cookie', [`refreshToken=${result.data.refreshToken}`])
        .set('192.168.1.1', '/test')
        .expect(200)
    })
})