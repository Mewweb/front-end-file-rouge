<template>
    <div class="text-center">
        <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError"></GoogleSignInButton>
        <!--<UButton to="/api/auth/google" external title="se connecter avec Google" class="w-auto inline-block cursor-pointer hover:opacity-50 mr-[1em] p-3 font-semibold rounded-lg shadow-md" color="white" variant="solid" :ui="{color:{white:'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}}"><IconGoogle class="w-[1.8em] h-[1.8em] fill-purple-700" /></UButton>-->
        <UButton title="Se connecter avec Facebook" class="w-auto inline-block cursor-pointer hover:opacity-50 p-3 font-semibold rounded-lg shadow-md" color="white" variant="solid" :ui="{color:{white:'bg-[#1877F2] text-white hover:opacity-90'}}"><IconFacebook class="w-[1.8em] h-[1.8em] fill-purple-700" /></UButton>
    </div>
    <!-- Séparateur -->
    <div class="flex items-center my-6">
        <div class="flex-1 h-px bg-gray-300"></div>
        <span class="px-3 text-gray-500 uppercase text-sm">Ou</span>
        <div class="flex-1 h-px bg-gray-300"></div>
    </div>
</template>
<script setup>
    import {UButton} from '#components';
    import {jwtDecode} from "jwt-decode"
    import IconFacebook from '~/svg/IconFacebook.vue';
    import IconGoogle from '~/svg/IconGoogle.vue';

const handleLoginSuccess = async (response) => {
    const {credential} = response;
    console.log(response);
    /*let data = await accessData(`http://localhost:8080/m2l/user/getUser/${jwtDecode(credential).email}`);
    if(data.error == false)*/
};
const handleLoginError = () => {
    console.error("Login failed");
}
</script>