export const passwordRecoveryEmailTemplate = (confirmationCode: string):string  => {
    return  ` <h1>Thank for your action</h1>
    <p>To finish recovery password please follow the link below:
        <a href='https://somesite.com/recoveryPassword?code=${confirmationCode}'>complete registration</a>
    </p>
    `
}

export const newPasswordSuccess = (recoveryPassword:string):string => {
    return `<h1>Password recovery</h1>
    <p>To finish password recovery please follow the link below:
       <a href='https://somesite.com/password-recovery?recoveryCode=${recoveryPassword}'>recovery password</a>
   </p>`
}
