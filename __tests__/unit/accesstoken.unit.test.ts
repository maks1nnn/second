 
import MongoMemoryServer from "mongodb-memory-server-core"
import { SETTINGS } from "../../src/settings"
import { authServise } from '../../src/auth/servise/authRegister-servise'
import {loginServise} from '../../src/auth/servise/authLogin-servise'
import { ResultStatus } from '../../src/input-uotput-types/resultCode'
import { db } from '../e2e/helpers/db'

describe('UNIT', ()=>{

    beforeAll( async () => {
        const mongoServer = await MongoMemoryServer.create()
        const url = mongoServer.getUri()
        SETTINGS.MONGO_URL = url
    })

    beforeEach(async ()=> {
        await db.drop()
    })

    afterAll( async () => {
        await db.drop()
        await db.stop()
    })

    afterAll( (done)=> done())

    const checkAccessTokenUseCase = loginServise.checkAccessToken;

    it.skip( 'should not verify noBearer auth', async () => {
        const result = await checkAccessTokenUseCase("Basic sefdofgf")

        expect (result.status).toBe(ResultStatus.Unauthorized)
    })
})