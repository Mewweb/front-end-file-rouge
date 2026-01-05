export default defineNuxtRouteMiddleware(() => {
    const {user} = useUserSession();
    console.log(user);
    
})