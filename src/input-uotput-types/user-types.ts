

export const UserValidationRules = {
    loginMaxLength : 10,
    loginMinLength: 3,
    loginPattern: /^[a-zA-Z0-9_-]*$/,
    passwordMaxLength: 20,
    passwordMinLength: 6,
    emailPattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
}

export type InputUserType = {
    login: string,
    password: string,
    email: string,
}