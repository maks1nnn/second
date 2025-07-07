import nodemailer from 'nodemailer'
import { SETTINGS } from '../../settings';
 
export const nodemailerService = {

    async sendEmail(email: string, code: string, template: (code:string)=> string): Promise<boolean> {
        let transporter = nodemailer.createTransport( {
            service: "gmail",
            auth: {
                user: SETTINGS.EMAIL,
                pass: SETTINGS.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            },
        });


        let into = await transporter.sendMail( {
            from: 'Maksim <' + SETTINGS.EMAIL + '>',
            to: email,             
            html: template(code),
        });
        return !!into;
    },

    async sendCode(email: string, code: string, template: (code:string)=> string): Promise<boolean> {
        let transporter = nodemailer.createTransport( {
            service: "gmail",
            auth: {
                user: SETTINGS.EMAIL,
                pass: SETTINGS.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            },
        });


        let into = await transporter.sendMail( {
            from: 'Maksim <' + SETTINGS.EMAIL + '>',
            to: email,             
            html: template(code),
        });
        return !!into;
    }
}