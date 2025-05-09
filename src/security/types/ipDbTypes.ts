export type OutputIpType = {
    ip : string,
    title : string,
    lastActiveDate : string,
    deviceId : string
}

export type InputIpType = {
    ip: string,
    user_id: string,
    deviceId: string,
    lastActiveDate : string,
    iat: string,
    exp: string,
}

export type DeleteSessionByDeviceIdType = {
    ip: string,
    deviceId: string,
}

export type FindSessionByDevice = {
    ip: string,
    deviceId: string,
}
