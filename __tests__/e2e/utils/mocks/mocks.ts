import {nodemailerService} from  '../../../../src/common/adapters/nodemailer-adapter'

export const emailServiceMock = {
    async sendEmail (email: string, code: string, template:(code:string)=>string): Promise<boolean> {
    return true
}
}
