/*import {Request, Response, NextFunction} from 'express
import MongoMemoryServer from "mongodb-memory-server-core"
import { SETTINGS } from "../../src/settings"
import {checkRateLimit} from './../../src/middlewares/checkRateLimit'
import { ResultStatus } from '../../src/input-uotput-types/resultCode'
import { db } from '../e2e/helpers/db'
import Response from 'superagent/lib/node/response'


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

    const checkRateCase = checkRateLimit;

    it( 'should ', async () => {
        const url = '192.168.1.1';
        const ip =   'djondow';
        const req = {
            originalUrl: url ,
            ip:  ip ,
        };
         
        const result = await checkRateLimit(req as any,res, next   )

        expect (result.status).toBe(ResultStatus.Unauthorized)
    })
})
*/
import {checkRateLimit} from './../../src/middlewares/checkRateLimit';
import { rateRepository } from './../../src/repositories/rateMongo-repositiries';
 
import MongoMemoryServer from "mongodb-memory-server-core"
import { SETTINGS } from "../../src/settings"
import { db } from '../e2e/helpers/db'

describe('checkRateLimit integration test (no mocks)', () => {
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

  const mockRequest = (ip: string, url: string) => ({
    ip,
    originalUrl: url,
    headers: {}
  });

  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockNext = jest.fn();

  it.skip('should allow first 5 requests', async () => {
    const req = mockRequest('192.168.1.1', '/test');
    const res = mockResponse();

    // Первые 5 запросов должны проходить
     
    await checkRateLimit(req as any, res, mockNext);
    expect(mockNext).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled(); 
    
  });

  /*it('should block 6th request', async () => {
    const req = mockRequest('192.168.1.1', '/test');
    const res = mockResponse();

    // 5 успешных запросов
    for (let i = 0; i < 5; i++) {
      await checkRateLimit(req as any, res, mockNext);
      mockNext.mockClear();
    }

    // 6-й запрос должен быть отклонен
    await checkRateLimit(req as any, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(429);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should reset counter after time window', async () => {
    const req = mockRequest('192.168.1.1', '/test');
    const res = mockResponse();

     
    // Следующий запрос должен снова проходить
    await checkRateLimit(req as any, res, mockNext);
    expect(mockNext).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });*/
});