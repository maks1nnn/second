import jwt from 'jsonwebtoken'
import { SETTINGS } from '../settings'


export const jwtServise = {
    async createToken(userId: string): Promise<string> {
        return jwt.sign(
            {
                userId: userId,
            }, SETTINGS.AC_SECRET,
            {
                expiresIn: SETTINGS.AC_TIME,
            }
        );
    },

    async decodeToken (token: string): Promise<any> {
        try {
            return jwt.decode(token);
        }catch(e: unknown) {
                console.error('Can not decode token', e);
                return null;
        }
    },

    async verifyToken(token:string) : Promise<any> {
        try{
           const result:any = jwt.verify(token, SETTINGS.AC_SECRET);
           console.log(result) 
           return result.userId
        }catch(error) {
            console.error("Token verify some error");
            return null;
        }
    }
}

