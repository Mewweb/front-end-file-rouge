export async function refreshAuth(){
    const user = useUserSession();
    /*const {data,error} = await useFetch(`${useRuntimeConfig().public.urlBackend}/authenticate`,{
        credentials:'include',
        method:'POST',
        body:{'refreshToken':useCookie('auth:refresh')

        }
    })*/
   console.log(useCookie("auth:refresh"))
   const {data,error} = await useFetch(`http://localhost:8080/m2l/authenticate`, {
    method:'POST',
    credentials:'include',
    body:{
        refresh_token: useCookie("auth:refresh").value
    }
   })
    return data.value
}