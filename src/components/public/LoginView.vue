<template>
  <div class="fixed top-[10%] right-2">
    <div class="items-center justify-center">
      <div class="p-7 rounded shadow-md max-auto text-center w-full lg:max-w-md">
        <h3 class="font-bold pb-4">{{ $t('brand.google') + $t(" ") + $t('general.signin') }}</h3>
        <GoogleLogin :callback="googleSignin" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { decodeCredential } from 'vue3-google-login';

import { useMyAccount } from '@/stores/account';
import { useShowStore } from '@/stores/show';

import { ajaxCall, ajaxCompare } from '@/utils/ajax';
import browserDetect from '@/utils/browser'

const browser = browserDetect();
const myAccount = useMyAccount();
const showStore = useShowStore();
const router = useRouter();

/**
 * Handle Google Sign-In response.
 * @param {Object} response - The response object from Google Sign-In.
 */
const googleSignin = async (response) => {
  // decodeCredential will retrive the JWT payload from the credential
  const userData = decodeCredential(response.credential)
  console.log(userData)
  if (userData.email_verified) {
    localStorage.setItem(import.meta.env.VITE_APP_SITE_SHORT + "User", userData.email);
    const ajaxData = {
      browser: browser.browser.name,
      user: userData.email
    }
    const result = await ajaxCall({
      data: ajaxData,
      url: "user/login"
    })
    if (ajaxCompare(result.errno, [1])) {
      sessionStorage.setItem(import.meta.env.VITE_APP_SITE_SHORT + "Token", result.jwt.errmsg)
      myAccount.updateAccountData({
        key: "profile",
        value: result.errmsg[0]
      });
      showStore.updateShow({
        key: "loginModal",
        value: false
      })
      router.push("/user/dashboard")
    }
  }
}
</script>