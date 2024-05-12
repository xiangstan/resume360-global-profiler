<template>
  <div v-if="!isLoading">
    <AlertView v-if="!hasMetaMask" :alert="alertMessage" />
    <button
      v-if="ethAddress === ''"
      id="connect-metamask-btn"
      class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400 flex justify-start items-center gap-1 select-none"
      @click="getAccount"
    >
      <img src="@/assets/img/metamask-fox.svg" class="w-[30px]" />
      Connect to MetaMask
    </button>
    <p v-else>
      ETH Address: {{ ethAddress }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useWeb3Store } from '@/stores/web3';

import AlertView from '@/components/commons/AlertView.vue';

const web3Store = useWeb3Store();
/*** Reactive variable to store the connected account */
const ethAddress = computed(() => {
  return web3Store.ethAddress
});
const hasMetaMask = ref(false); /*** MetaMask status */
const alertMessage = ref('');   /*** Alert message */
const isLoading = ref(true);

if (hasMetaMask.value && window.ethereum.isConnected()) {
  console.log("MetaMask is connected!");
}

/*** Connect to MetaMask wallet */
const getAccount = async () => {
  try {
    if (!window.ethereum) {
      console.warn('MetaMask is not installed.');
      return;
    }
    // Request user's accounts
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const selectedAccount = accounts[0];
    // Update the account value in the reactive variable
    web3Store.updateData({
      key: 'ethAddress',
      value: selectedAccount
    });
    // console.log(account)
    // console.log(account.value)
  } catch (err) {
    if (err.code === 4001) {
      console.log('Please connect to MetaMask.');
    } else {
      console.error(err);
    }
  }
};

onMounted(() => {
  if (typeof window.ethereum !== "undefined") {
    hasMetaMask.value = true;
  }
  else {
    alertMessage.value = "Please install MetaMask wallet or allow MetaMask to access this application.";
  }
  isLoading.value = false
})
</script>