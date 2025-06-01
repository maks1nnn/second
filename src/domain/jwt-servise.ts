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
        try {
            return jwt.decode(token) as { id: string;deviceId:string; iat: number; exp: number } | null;;
        } catch (e: unknown) {
            console.error('Can not decode token', e);
            return null;
        }
    },

    async verifyToken(token: string): Promise<any> {
        try {
            const result: any = jwt.verify(token, SETTINGS.AC_SECRET);
            console.log(result + 'rrrrrrrrggggggglllllll')
            return result.userId
        } catch (error) {
            console.error("Token verify some error");
            return null;
        }
    },
    async verifyRefreshToken(token: string): Promise<any> {
        try {
            const result: any = jwt.verify(token, SETTINGS.REF_SECRET);
            console.log('verifYY  ' + result + 'AND' + result.data.userId)
            return result.data
        } catch (error) {
            console.error("Token verify some error");
            return null;
        }
    }
}

