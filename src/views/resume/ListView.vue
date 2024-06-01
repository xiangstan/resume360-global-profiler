<template>
  <div>
    <BreadCrumbs :items="bc" />
    <IsLoading v-if="isLoading" />
    <template v-else>
      <NoRecord v-if="items.length < 1" />
      <div v-else class="flex gap-3 flex-wrap">
        <ListCard v-for="i in items" :key="i.tokenId" :i="i" class="flex" />
      </div>
    </template>
    <ListModal />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useWeb3Store } from '@/stores/web3';

import { ethers } from 'ethers';
import { getRPCProvider } from '@/utils/web3';

import contractABI from '@/assets/contracts/resumeabi.json';

import BreadCrumbs from '@/components/private/BreadCrumbs.vue';
import IsLoading from '@/components/static/IsLoading.vue';
import ListCard from './ListCard.vue';
import NoRecord from '@/components/commons/NoRecord.vue';
import ListModal from './ListModal.vue';

const web3Store = useWeb3Store();
const networkId = web3Store.chainId

const provider = new ethers.JsonRpcProvider(getRPCProvider(Number(networkId)));
const contractAddress = import.meta.env.VITE_APP_RESUME_CONTRACT;
const contract = new ethers.Contract(contractAddress, contractABI, provider);

const isLoading = ref(true)
const items = ref({});
const bc = ref([
  { name: 'list_of_resumes', url: '' }
]);
/***
 * methods
 */
async function fetchAllNFTs() {
  try {
    const totalSupply = await contract.totalSupply();
    const nfts = [];
    for (let i = 0; i < totalSupply; i++) {
      const tokenId = await contract.tokenByIndex(i);
      const tokenURI = await contract.tokenURI(tokenId);
      nfts.push({ tokenId: tokenId.toString(), tokenURI });
    }
    return nfts;
  } catch (err) {
    console.error("Error fetching NFTs:", err);
    return [];
  }
}

onMounted(() => {
  fetchAllNFTs().then(nfts => {
    console.log(nfts)
    items.value = nfts
    isLoading.value = false
  }).catch(err => {
    console.error("Error fetching NFTs:", err);
  });
})
</script>
