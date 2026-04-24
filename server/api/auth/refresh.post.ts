import { jwtDecode } from "jwt-decode";

interface jwtDecodeInterface {
    iss: string,
    sub: string,
    role: string,
    exp: number,
    iat: number
}

export default defineEventHandler(async (event) => {
    const jwt = await readBody(event);

    const accessTokenDecode: jwtDecodeInterface = jwtDecode(jwt.accessToken);
    setCookie(event, 'auth:access', jwt.accessToken, {
        sameSite: 'strict',
        expires: new Date(accessTokenDecode.exp * 1000),
        secure: true
    });

    await setUserSession(event, {
        user: {
            email: accessTokenDecode.sub,
            exp: accessTokenDecode.exp
        }
    })
    return true;
})