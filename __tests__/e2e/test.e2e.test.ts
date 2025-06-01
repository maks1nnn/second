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
     
    /*beforeAll(async () => {
       
    })
     
    })
    beforeEach(async () => {
      
    })
    afterAll(async () => {
        
    })*/
     
     
    it.skip  ('testing should cleaning all data collection, async', async () => {
        //await  connectionToDB() 
            
       await getRequest()
           .delete('/testing/all-data')
           .expect(204)

         
           

    })

})
 