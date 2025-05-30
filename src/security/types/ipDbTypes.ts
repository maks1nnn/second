export type OutputIpType = {
    ip : string,
    title : string,
    lastActiveDate : string,
    deviceId : string
}

export type InputIpType = {
    ip: string,
    title : string,
    user_id: string,
    deviceId: string,
    lastActiveDate : Date,
    iat: number,
    exp: number,
}

export type DeleteSessionByDeviceIdType = {
    id: string,
    deviceId: string,
}

export type FindSessionByDevice = {
    id: string,
    deviceId: string,
}

export type RefreshSessionDataType = {
    id: string,
    deviceId : string,
    iat: number,
}
