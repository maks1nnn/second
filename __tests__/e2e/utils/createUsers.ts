import request from 'supertest'

describe("integration test for AuthTest", ()=>{
    describe("createUser", ()=>{
        it("should return", async ()=>{
            expect (5).toBe(5)
        })
    })
})


export const createUser = async (app:any)=>{
    const resp = await  request(app).post(router.path).send({
        login: 'test',
        email: 'test@gmail.com',
        pass: '123'
    }).expect(200)
    return resp.body
}

export const createUsers = async (app: any, count: number) => {
    const users = []

for (let i = 0;i <= count ; i++){
    const resp = await request(app).post(router.path).send({
        login: 'test' + 1,
        email: `rest${i}@gmail.com`,
        pass : '12345678'
    }).expect(200)

    users.push(resp.body)
}
    return users;
}