import request from "supertest";
import {app} from "../../src/app" 
import {db} from "../../src/db/mongo-db"
import { MongoMemoryServer } from 'mongodb-memory-server-core';
import { SETTINGS } from "../../src/settings";
//import { }


describe('USER_TESTS', () =>{
    

    beforeAll( async () => {
        const mongoServer = await MongoMemoryServer.create()
        await db.run(mongoServer.getUri())
        
        
    })

})