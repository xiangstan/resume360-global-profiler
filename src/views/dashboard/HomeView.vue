<template>
  <div>
    <BreadCrumbs :items="bc" />
    <template v-if="!isLoading">
      <div class="relative flex flex-col flex-auto min-w-0 p-4 overflow-hidden break-words border-2 shadow-blur rounded-2xl bg-white/80 dark:bg-gray-800 bg-clip-border mb-4 draggable" draggable="true">
        <div class="flex flex-wrap -mx-3">
          <div class="flex-none w-auto max-w-full px-3">
            <div class="text-base ease-soft-in-out h-[100px] w-[100px] relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
              <ImageUoload :get-profile="getProfile" />
            </div>
          </div>
          <div class="flex-none w-auto max-w-full px-3 my-auto">
            <div class="h-full">
              <h5 class="mb-1 font-bold text-xl flex items-center justify-start">
                <template v-if="!editName">
                  <span class="mr-1">
                    {{ formData.name }}
                  </span>
                  <a v-if="!editName" class="cursor-pointer" @click="editName = true" title="Edit your name">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-amber-400">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </a>
                </template>
                <template v-else>
                  <input
                    v-model="formData.name"
                    class="mr-2 h-[42px] w-[280px]"
                    :class="{'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white block w-full p-2.5' : editName}"
                    type="text"
                  />
                  <a class="cursor-pointer" @click="editName = false" title="Cancel name edit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  </a>
                </template>
              </h5>
              <p class="mb-0 font-semibold leading-normal text-sm">
                <a :href="'mailto:' + getProfile.email" :title="`Email ${getProfile.email}`">
                  {{ getProfile.email }}
                </a>
              </p>
            </div>
          </div>
          <div class="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12"></div>
        </div>
      </div>
      
      <div class="w-full pb-6 max-auto">
        Test
        <!-- <img src="https://ipfs.io/ipfs/QmaJrsVFMPsJPahvbhcQyDLcUoJX7A33KfKqMg43vrRvQE" /> -->
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useMyAccount } from '@/stores/account';

import BreadCrumbs from '@/components/private/BreadCrumbs.vue';
import ImageUoload from '@/components/private/ImageUpload.vue';

const accountStore = useMyAccount();

const bc = ref([]);
const formData = reactive({
  name: ''
});
const isLoading = ref(true);
const editName = ref(false);

const getProfile = computed(() => {
  return accountStore.profile;
});

/***
 * Methods
 */
const initFetch = () => {
  formData.name = accountStore.profile.name;
};

onMounted(() => {
  initFetch();
  isLoading.value = false
})
</script>