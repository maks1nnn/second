import request from 'supertest'
import { SETTINGS } from '../../src/settings'
 
 
import { db } from './../e2e/helpers/db'
import { app } from '../../src/app'
import {addRoutes} from './../../src/routes/routes'
import { connectionToDB } from '../../src/db/mongo-db'

const getRequest =  () => {
    return request(app)
}
addRoutes(app)



describe('TEST_TEST',   () => {
   /* let mongoServer: MongoMemoryServer;
    let connection: MongoClient;*/
    /*beforeAll(async () => {
        const mongoServer: MongoMemoryServer = await MongoMemoryServer.create()
        SETTINGS.MONGO_URL = mongoServer.getUri();
        await db.run()
    })*/
   /* afterAll(async () => {
        await db.stop();
    })
    beforeEach(async () => {
        await db.drop();
    })*/
     
     
    it ('testing should cleaning all data collection, async', async () => {
        if(!await connectionToDB()){
            console.log('ahtyng')
            process.exit()
        }
        await getRequest()
            .delete('/testing/all-data')
            .expect(204)

         


    })

     
})