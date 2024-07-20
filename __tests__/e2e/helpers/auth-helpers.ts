import { req } from "../../helpers/req";
import { SETTINGS } from "../../../src/settings";
import {createUser} from './user-helpers'

export const loginUser = async() => {
    await createUser()

    const res = await req.post(`${SETTINGS.PATH.AUTH}/login`)
                            .send({
                                loginOrEmail: 'test',
                                password: 'test1234'
                            }).expect(200)
                            return res.body
}