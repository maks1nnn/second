import {req} from '../helpers/req'
import { app } from "../../src/app"
import { MongoMemoryServer } from 'mongodb-memory-server-core';
import { SETTINGS } from "../../src/settings";
import { db } from './../e2e/helpers/db'
import { Db, MongoClient } from 'mongodb'
import {testSeeder} from './utils/test.seederForUsers'

describe('USER_TESTS', () => {



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

    it ("should create user with correct data by sa and return it: STATUS 201", async () => {
        const userDto = testSeeder.createUserDto()
        console.log(userDto)
        const authHeader = `Basic ${Buffer.from('admin:qwerty').toString('base64')}`;

        const newUser = await (req
        .post(SETTINGS.PATH.USERS)
        .set('Authorization', authHeader)
        .send(userDto)
        .expect(201))
    })

    
})