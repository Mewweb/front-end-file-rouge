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

export async function putData(url:string, cartItems:Array<Object>){
    try{
        const data =await $fetch(url, {
            method:'PUT',
            credentials:'include',
            body:cartItems,
            headers:{
                authorization: `Bearer ${useCookie('auth:access').value}`
            }
        })
        return true;
    }catch(e){
        return false;
    }
}

export async function deleteData(url:string){
    try{
        const data = await $fetch(url, {
            method:'DELETE',
            credentials:'include',
            headers:{
                authorization: `Bearer ${useCookie('auth:access').value}`
            }
        })
        return {data: data, error:false};
    }catch(e){
        return {data : [],error: true};
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
        
        return {data:data, error: false};
    }catch(e){
        return {data:[], error:true};
    }
}