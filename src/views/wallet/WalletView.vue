<template>
  <div>
    <BreadCrumbs :items="bc" />
    <div v-if="!isLoading" class="relative">
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
          <strong><span class="uppercase">{{ getChainName }}</span> Network:</strong> {{ getShortAddress(getAddress) }}
          <a class="text-red-300 cursor-pointer hover:text-red-600" title="Disconnect Wallet" @click="disconnectWallet">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          </a>
        </p>
        <p>
          <strong>{{ getTokenSymbol(getChainId) }}:</strong> {{ getTokenBalance }}
        </p>
      </div>
      <div class="top-0 right-0 absolute">
        <PriceView v-for="(t, idx) in tokenPrices" :key="idx" :token="idx" :price="t" />
      </div>
    </div>
    <!-- {{ getTokensPrices }} -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { useWeb3Store } from '@/stores/web3';

import { shortenString } from '@/utils/strings';
import { getChainTokenSymbol, getLatestTokenPrice, getNetworkTokenAddress } from '@/utils/web3';

// import { getNetwork } from '@/utils/metamask';
import AlertView from '@/components/commons/AlertView.vue';
import BreadCrumbs from '@/components/private/BreadCrumbs.vue';
import PriceView from './PriceView.vue';

const web3Store = useWeb3Store();

const alertMessage = ref('');   /*** Alert message */
const bc = ref([
  { name: 'wallet', url: '' }
]);
const hasMetaMask = ref(false); /*** MetaMask status */
const isLoading = ref(true);
const tokenPrices = reactive({
  'eth': 0,
  'link': 0
})

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

/***
 * methods
 */
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
/*** hide the full wallet address */
const getShortAddress = (address) => {
  return shortenString(address);
}
/*** get the current connected network's default token symbol */
const getTokenSymbol = (chainId) => {
  return getChainTokenSymbol(Number(chainId));
}
/*** disconnect current connected wallet */
const disconnectWallet = () => {
  web3Store.discounnectWallet();
}
/*** get token prices */
const getTokensPrices = async () => {
  let tokens = {};
  if (getChainId.value && !isLoading.value) {
    tokens = getNetworkTokenAddress(getChainId.value);
    // tokens.chainId = getChainId.value;
    for (const t in tokens) {
      tokenPrices[t] = await getLatestTokenPrice(tokens[t]);
    }
  }
}

onMounted(async () => {
  if (typeof window.ethereum !== "undefined") {
    hasMetaMask.value = true;
  }
  else {
    alertMessage.value = "Please install MetaMask wallet or allow MetaMask to access this application.";
  }
  await web3Store.connectToMetaMask();
  isLoading.value = false;
  getTokensPrices();
})
</script>