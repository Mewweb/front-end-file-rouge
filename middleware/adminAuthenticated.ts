export default defineNuxtRouteMiddleware(()=>{
    const {user} = useUserSession();
})