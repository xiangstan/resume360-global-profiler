<template>
  <section class="bg-gray-900 text-gray-200 py-16">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-4">
      <div class="w-full md:w-2/5 items-center justify-center">
        <h2 class="text-4xl font-bold mb-4">
          {{ getMessage.contactus_title }}
        </h2>
        <p class="mb-6">
          {{ getMessage.contactus_desc }}
        </p>
      </div>
      <div class="w-full md:w-1/2 items-center justify-center">
        <form @submit.prevent="submitForm" class="bg-gray-800 p-8 rounded-lg shadow-lg w-full">
          <div class="mb-4">
            <label for="form-name" class="block mb-2 font-bold capitalize">
              {{ $t('general.name') }}
            </label>
            <input type="text" id="form-name" v-model="form.name" required class="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="form-email" class="block mb-2 font-bold capitalize">
              {{ $t('general.email') }}
            </label>
            <input type="email" id="form-email" v-model="form.email" required class="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-6">
            <label for="form-message" class="block mb-2 font-bold">
              {{ $t('general.message') }}
            </label>
            <textarea id="form-message" v-model="form.message" required class="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 h-24 resize-none"></textarea>
          </div>
          <button type="submit" class="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 capitalize flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            {{ $t('general.submit') }}
          </button>
          <p v-if="errorMessages" class="text-red-500 mt-4">{{ errorMessages }}</p>
          <p v-if="successMessages" class="text-green-500 mt-4">{{ successMessages }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';

import { useI18n } from 'vue-i18n';
const { locale } = useI18n({ useScope: "global" });

const messageSet = {
  "en_US": {
    'contactus_title': 'Contact Us Today',
    'contactus_desc': 'Reach out to us with any questions or requests. We are here to help you with your digital marketing needs.'
  },
  "zh_CN": {
    'contactus_title': '今天就联系我们',
    'contactus_desc': '如有任何问题或需求，请随时联系我们。我们将竭诚为您提供数字营销方面的帮助。'
  }
};
const form = ref({
  name: "",
  email: "",
  message: "",
});
const errorMessages = ref('');
const successMessages = ref('');

const getMessage = computed(() => {
  return messageSet[locale.value];
})

const submitForm = () => {
  console.log("Function Does not Exist");
}
</script>
