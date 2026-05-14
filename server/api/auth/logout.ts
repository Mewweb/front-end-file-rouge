export default defineEventHandler(async(event)=>{
    deleteCookie(event,'auth:refresh');
    deleteCookie(event,'auth:access');
})