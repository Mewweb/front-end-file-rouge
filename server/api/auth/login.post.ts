import {jwtDecode} from "jwt-decode"

interface jwtDecodeInterface{
    iss: string,
    sub: string,
    role: string,
    exp: number,
    iat: number
}

export default defineEventHandler(async (event) => {
    const jwt = await readBody(event);

    const AccessTokenDecode: jwtDecodeInterface = jwtDecode(jwt.accessToken);
    const refreshTokenDecode:jwtDecodeInterface = jwtDecode(jwt.refreshToken);

    setCookie(event, 'auth:access', jwt.accessToken,{
        sameSite:'strict',
        expires:new Date(AccessTokenDecode.exp * 1000),
        secure: true
    });

    setCookie(event, 'auth:refresh', jwt.refreshToken,{
        expires: new Date(refreshTokenDecode.exp * 1000),
        sameSite: 'strict',
        secure:true
    });

    await setUserSession(event, {
        user:{
            email:AccessTokenDecode.sub,
            exp: AccessTokenDecode.exp
        }
    })
    return new Date(refreshTokenDecode.exp);
})