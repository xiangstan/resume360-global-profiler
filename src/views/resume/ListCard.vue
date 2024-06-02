<template>
  <div class="relative flex flex-col bg-white bg-clip-border rounded-xl shadow-md dark:bg-black w-96">
    <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
      <img :src="jsonData.image" :alt="`${jsonData.name}'s profile image'`" />
    </div>
    <div class="p-6 text-center">
      <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        {{ jsonData.name }}
      </h4>
    </div>
    <div class="mx-4">
      <p class="mb-2 flex flex-row item-start justify-start gap-1">
        <span class="font-bold text-xl">
          Abstract
        </span>
        <a class="cursor-pointer" title="View more details" @click="getDetailedInfo">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
          </svg>
        </a>
      </p>
      <p class="mb-4 break-all">
        {{ shortenAbstract(getNftTrait.abstract) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';

import axios from 'axios';
import { truncateString } from '@/utils/strings';

const props = defineProps({
  callback: {
    type: Function,
    required: true
  },
  i: {
    type: Object,
    default: () => {
      return {
        tokenId: -1,
        tokenURI: ''
      }
    }
  }
})
const jsonData = ref({});
const getNftTrait = computed(() => {
  let data = {
    abstract: '',
    resume: ''
  };
  if (typeof jsonData.value.attributes !== 'undefined') {
    const attr = jsonData.value.attributes;
    for (const a of attr) {
      if (a.trait_type === 'Abstract') {
        data.abstract = a.value;
      }
      else if (a.trait_type === 'Resume') {
        data.resume = a.value;
      }
    }
  }
  return data;
})
console.log(props.bio)
/***
 * methods
 */
/*** callbacn function */
const getDetailedInfo = () => {
  props.callback(getNftTrait.value.resume, jsonData.value.name)
}
/*** fetch data from nft */
const fetchData = async () => {
  try {
    const response = await axios.get(checkTokenUrl(props.i.tokenURI));
    jsonData.value = response.data;
  } catch (error) {
    console.error("Error fetching data from IPFS:", error);
  }
};
/*** check if images url starts with https */
const checkTokenUrl = (url) => {
  if (url.startsWith("https:")) {
  return url
} else {
  return `https://ipfs.io/ipfs/${url}`
}
}
/*** reduce the length of abstract in display */
const shortenAbstract = (str) => {
  return truncateString(str);
}

// Example of triggering the fetch automatically when the component is mounted
watchEffect(() => {
  fetchData();
});

</script>