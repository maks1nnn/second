export const passwordRecoveryEmailTemplate = (recoveryCode: string):string  => {
    return  `<h1>Password recovery</h1>
    <p>To finish password recovery please follow the link below:
       <a href='https://somesite.com/password-recovery?recoveryCode=${recoveryCode}'>recovery password</a>
   </p>`
}

export const newPasswordSuccess = (recoveryPassword:string):string => {
    return `<h1>Password recovery</h1>
    <p>To finish password recovery please follow the link below:
       <a href='https://somesite.com/password-recovery?recoveryCode=${recoveryPassword}'>recovery password</a>
   </p>`
   
}
