<template>
  <div v-if="!isLoading">
    <AlertView v-if="!hasMetaMask" :alert="alertMessage" />
    <button
      v-if="getAddress === ''"
      id="connect-metamask-btn"
      class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400 flex justify-start items-center gap-1 select-none"
      @click="getAccount"
    >
      <img src="@/assets/img/metamask-fox.svg" class="w-[30px]" />
      Connect to MetaMask
    </button>
    <div v-else>
      <p class="flex justify-start items-start gap-2">
        <strong><span class="uppercase">{{ getChainName }}</span> Address:</strong> {{ getShortAddress(getAddress) }}
        <a class="text-red-300 cursor-pointer hover:text-red-600" title="Disconnect Wallet" @click="disconnectWallet">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        </a>
      </p>
      <p>
        <strong>{{ getTokenSymble(getChainId) }}:</strong> {{ getTokenBalance }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useWeb3Store } from '@/stores/web3';

import { shortenString } from '@/utils/strings';
import { getChainTokenSymbol } from '@/utils/web3';

// import { getNetwork } from '@/utils/metamask';
import AlertView from '@/components/commons/AlertView.vue';

const web3Store = useWeb3Store();
/*** Reactive variable to store the connected account */
const getAddress = computed(() => {
  return web3Store.getAddress
});
const getChainId = computed(() => {
  return web3Store.chainId
})
const getChainName = computed(() => {
  return web3Store.chainName
})
const getTokenBalance = computed(() => {
  return web3Store.getBalance
})

const hasMetaMask = ref(false); /*** MetaMask status */
const alertMessage = ref('');   /*** Alert message */
const isLoading = ref(true);

/*** Connect to MetaMask wallet */
const getAccount = async () => {
  try {
    if (!window.ethereum) {
      console.warn('MetaMask is not installed.');
      return;
    }
    web3Store.connectToMetaMask();
  } catch (err) {
    if (err.code === 4001) {
      console.log('Please connect to MetaMask.');
    } else {
      console.error(err);
    }
  }
};

const getShortAddress = (address) => {
  return shortenString(address);
}

const getTokenSymble = (chainId) => {
  return getChainTokenSymbol(Number(chainId));
}

const disconnectWallet = () => {
  web3Store.discounnectWallet();
}

onMounted(() => {
  if (typeof window.ethereum !== "undefined") {
    hasMetaMask.value = true;
  }
  else {
    alertMessage.value = "Please install MetaMask wallet or allow MetaMask to access this application.";
  }
  web3Store.connectToMetaMask();
  isLoading.value = false;
})
</script>