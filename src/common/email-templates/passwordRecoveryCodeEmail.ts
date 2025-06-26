export const passwordRecoveryEmailTemplate = (confirmationCode: string):string  => {
    return  ` <h1>Thank for your action</h1>
    <p>To finish recovery password please follow the link below:
        <a href='https://somesite.com/recoveryPassword?code=${confirmationCode}'>complete registration</a>
    </p>
    `
}
