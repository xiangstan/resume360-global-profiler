<template>
  <div>
    <BreadCrumbs :items="bc" />
    <IsLoading v-if="isLoading" />
    <template v-else>
      <NoRecord v-if="items.length < 1" />
      <div v-else class="flex gap-3 flex-wrap">
        <ListCard v-for="i in items" :key="i.tokenId" :i="i" :callback="getResumeDetail" class="flex" />
      </div>
    </template>
    <ListModal v-if="showStore.isDialog" :bio="resumeData" :name="modalCharacterName" />
    <a @click="showModal">Show Modal</a>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useWeb3Store } from '@/stores/web3';
import { useShowStore } from '@/stores/show';

import { ethers } from 'ethers';
import { getRPCProvider } from '@/utils/web3';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

import contractABI from '@/assets/contracts/resumeabi.json';
import functionsABI from '@/assets/contracts/functionsabi.json';

import BreadCrumbs from '@/components/private/BreadCrumbs.vue';
import IsLoading from '@/components/static/IsLoading.vue';
import ListCard from './ListCard.vue';
import NoRecord from '@/components/commons/NoRecord.vue';
import ListModal from './ListModal.vue';

const web3Store = useWeb3Store();
const showStore = useShowStore();
const networkId = web3Store.chainId

const provider = new ethers.JsonRpcProvider(getRPCProvider(Number(networkId)));
const contractAddress = import.meta.env.VITE_APP_RESUME_CONTRACT;
const candidateAddress = import.meta.env.VITE_APP_FUNCTIONS_CONTRACT;
const contract = new ethers.Contract(contractAddress, contractABI, provider);

const isLoading = ref(true)
const items = ref({});
const bc = ref([
  { name: 'list_of_resumes', url: '' }
]);
const characterBio = ref(null);
const modalCharacterName = ref('');

const resumeData = computed(() => {
  let data = showStore.functionData;
  let temp = {}
  if (typeof data === "string") {
    temp = JSON.parse(data)
  }
  else {
    temp = data || {}
  }
  return temp
})
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
/*** fetch resume detailed data from Chain.link functions */
const getResumeDetail = async (data, characterName) => {
  modalCharacterName.value = characterName;
  await web3Store.connectToMetaMask();
  const provider = new ethers.BrowserProvider(window.ethereum);
  const { chainId } = await provider.getNetwork();
  if (Number(chainId) !== Number(import.meta.env.VITE_APP_DEFAULT_BLOCKCHAIN_ID)) {
    createToast(`Please switch to ${import.meta.env.VITE_APP_DEFAULT_BLOCKCHAIN_NAME}`, {
      showIcon: true,
      type: "danger",
      position: "bottom-right"
    })
    return;
  }
  else {
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(candidateAddress, functionsABI, signer);
    if (contract) {
      try {
        // Call the smart contract function with subscriptionId and URL as arguments
        const transaction = await contract.sendRequest(import.meta.env.VITE_APP_DEFAULT_FUNCTIONS_SUBID, [data]);
        console.log(transaction)
        contract.character()
          .then(result => {
            console.log("In side character")
            console.log(result); // Handle the result here
            console.log("type of result: " + typeof result)
            characterBio.value = result;
            showStore.updatefunctionValue(result);
            showModal();
          })
          .catch(error => {
            console.error(error); // Handle any error that occurred
          });
      }
      catch (error) {
        console.error('Error requesting data: ', error)
      }
    }
  }
}
/*** show modal */
const showModal = () => {
  showStore.updateShow({
    key: "isDialog",
    value: true
  })
}

onMounted(() => {
  fetchAllNFTs().then(nfts => {
    items.value = nfts
    isLoading.value = false
  }).catch(err => {
    console.error("Error fetching NFTs:", err);
  });
})
</script>
