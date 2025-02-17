import { req } from "../../helpers/req";
import request from "supertest";


export const createUser = async (app:any) =>{
    const resp = await (await request(app).post(routerPaths.users)).auth(ADMIN_LOGIN, ADMIN_PASS).send({
        login: 'test',
        email: 'test@gmail.com',
        pass:'123',
    }).expect(200)
    return  resp.body
} 