interface JwtDataInterface {
    accessToken : string,
    refreshToken:string
}


export async function refreshAuth() {
    try{
    const {fetch:refreshSession} = useUserSession();
        const jwtData:JwtDataInterface = await $fetch("http://localhost:8080/m2l/authenticate", {
            method: 'POST',
            credentials: 'include',
            body: {
                refreshToken: useCookie("auth:refresh").value,
                grantType: 'REFRESH_TOKEN'
            }
        })
        await $fetch('/api/auth/refresh',{
            method:'POST',
            body:jwtData
        })
        await refreshSession();
        return true;
    }
    catch(e){
        return false;
    }
    
}

export async function accessData(url: string) {
    console.log(useCookie('auth:access'));
    try{
        const data = await $fetch(url,{
            method:'GET',
            credentials:'include',
            headers:{
                authorization: `Bearer ${useCookie('auth:access').value}`
            }
        })
        
        return data;
    }catch(e){
        return false;
    }

    const { data, error } = await useFetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            authentication: `Bearer ${useCookie('auth:access')}`
        }
    })


    return data.value;
}