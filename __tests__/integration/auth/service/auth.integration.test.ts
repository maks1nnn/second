import{ MongoMemoryServer} from 'mongodb-memory-server-core'
import { db } from '../../../../src/db/mongo-db'
import { testSeeder } from '../../../e2e/utils/test.seeder'
import {authServise} from '../../../../src/auth/servise/auth-servise'
import { nodemailerService } from '../../../../src/common/adapters/nodemailer-adapter'
import { ResultStatus } from '../../../../src/input-uotput-types/resultCode'
import { userRepository } from '../../../../src/repositories/userMongoRepository'
import { randomUUID } from 'crypto'
import { Result } from '../../../../src/comments/types/comment-types'


describe('user registration', () => {
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

})