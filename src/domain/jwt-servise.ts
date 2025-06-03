import jwt, { Jwt } from 'jsonwebtoken'
import { SETTINGS } from '../settings'
import { JwtInputType } from '../common/types/jwtTypes';



export const jwtServise = {
    async createToken(data: JwtInputType): Promise<string> {
        return jwt.sign(
            {
                id: data.id,
                deviceId: data.deviceId,
                iat: Math.floor(Date.now() / 1000),
            }, SETTINGS.AC_SECRET,
            {
                expiresIn: SETTINGS.AC_TIME,
            }
        );
    },

    async createRefreshToken(data: JwtInputType): Promise<string> {
        return jwt.sign(
            {
                id: data.id,
                deviceId: data.deviceId,
                iat: Math.floor(Date.now() / 1000),
            }, SETTINGS.REF_SECRET,
            {
                expiresIn: SETTINGS.REF_TIME,
            }
        );
    },

    async decodeToken(token: string): Promise<any> {
         
           const result = jwt.decode(token) as { id: string;deviceId:string; iat: number; exp: number } | null;
            if( result){
                return result
            }
    },

    async verifyToken(token: string)  {
        try {
            const result: any = jwt.verify(token, SETTINGS.AC_SECRET);
            console.log(result + 'rrrrrrrrgggggggllllll')
            return result.userId
        } catch (error) {
            console.error("Token verify some error");
            return null;
        }
    },
    async verifyRefreshToken(token: string)  {
         
            const result: any = jwt.verify(token, SETTINGS.REF_SECRET) as { 
                id: string;deviceId:string; iat: number; exp: number } | null;
            console.log('verifYY  ' + result  )
            if( result !== null){
                return result
            }else{
                return null
            }
            
         
    }
}

