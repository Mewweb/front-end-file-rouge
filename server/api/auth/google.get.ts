interface CredentialsResponse {
    credentials?:string;
    select_by?:"auto"|"user"|"user_1tap"|"user_2tap"|"btn"|"btn_confirm"|"brn_add_session"|"btn_confirm_add_session"|"auto"|"user"|"user_1tap"|"user_2tap"|"btn"|"btn_confirm"|"brn_add_session"|"btn_confirm_add_session";
    state?:string
}
export default defineOAuthGoogleEventHandler({
    async onSuccess(event){
        return sendRedirect(event, '/');
    },
    onError(event, error){
        console.error("Erreur d'authentification de google", error);
        return sendRedirect(event, '/login');
    }
})