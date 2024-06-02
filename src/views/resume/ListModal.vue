<template>
  <div id="default-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-10 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="absolute bg-zinc-600 opacity-30 top-0 right-0 left-0 bottom-0"></div>
    <div class="relative p-4 w-full max-w-2xl max-h-full mx-auto mt-[10%]">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ name }}
          </h3>
          <a type="button" class="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" @click="closeModal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </a>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          <div v-if="bio.exp" class="mb-10">
            <h4 class="flex items-center justify-between gap-3">
              <span class="font-bold">
                {{ bio.exp.t }}
              </span>
              <em>
                {{ bio.exp.y }} years experience
              </em>
            </h4>
            <p>
              {{ bio.exp.c }}
            </p>
          </div>
          <div v-if="bio.edu">
            <h4 class="flex items-center justify-between gap-3">
              <span class="font-bold">
                {{ bio.edu.d }}
              </span>
              <em>
                Attend {{ bio.edu.y }} years
              </em>
            </h4>
            <p>
              {{ bio.edu.s }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useShowStore } from '@/stores/show';
const showStore = useShowStore();

defineProps({
  name: {
    type: String,
    default: "Default Name"
  },
  bio: {
    type: Object,
    default: () => {
      return {
        edu: {},
        exp: {}
      }
    }
  }
})
/**
 * methods
 */
const closeModal = () => {
  showStore.updateShow({
    key: "isDialog",
    value: false
  })
}
</script>