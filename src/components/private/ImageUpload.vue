<template>
  <div
    class="max-w-md mx-auto hover:border-2 hover:border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 relative"
    @dragover.prevent
    @dragenter.prevent
    @dblclick="triggerFileInput"
    @drop="handleDrop"
  >
    <div v-if="!image">
      <img v-if="!getProfile.img" src="@/assets/img/profile-default.svg" alt="Default Profile Image" class="w-full shadow-soft-sm rounded-xl" />
      <img v-else :src="'https://ipfs.io/ipfs/' + getProfile.img" :alt="getProfile.email + ' Profile Image'" class="w-full shadow-soft-sm rounded-xl" />
    </div>
    <div v-else class="flex flex-col items-center">
      <img :src="image" alt="Image Preview" class="w-full h-auto max-h-64 object-contain" />
      <a class="absolute top-10 right-[-30px] bg-red-500 text-white rounded hover:bg-red-600" @click="removeImage">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </a>
    </div>
    <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" accept="image/*" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMyAccount } from '@/stores/account';

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

import { ajaxCall, ajaxCompare, ajaxErrShow } from '@/utils/ajax';
import browserDetect from '@/utils/browser';
import { objClone } from '@/utils/objects';

const accountStore = useMyAccount();
const browser = browserDetect();

const props = defineProps({
  getProfile: {
    type: Object,
    default: () => {
      return {
        uaid: 0,
        email: ""
      }
    }
  }
})

const image = ref(null);
const fileInput = ref(null);

// Function to convert Blob to base64
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const formData = {
  browser: browser.browser.name,
  method: "avatar"
}

const handleDrop = (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files.length) {
    handleFile(files[0]);
  }
};

const handleFileChange = (e) => {
  e.preventDefault();
  const file = e.target.files[0];
  if (file) {
    handleFile(file);
  }
};

const handleFile = async (file) => {
  if (file && file.type.startsWith('image/')) {
    console.log(file)
    try {
      // Convert blob to base64
      const base64Data = await blobToBase64(file);
      // Create a JSON object
      const ajaxData = objClone(formData, {
        uaid: props.getProfile.uaid,
        user: props.getProfile.email,
        value: base64Data
      });
      const result = await ajaxCall({
        data: ajaxData,
        url: "resume/upload"
      });
      const err = ajaxErrShow(result)
      if (ajaxCompare(result.errno, [101])) {
        accountStore.updateAccountData({
          key: "profile",
          value: result.profile.errmsg[0]
        });
      }
      createToast(err.message, {
        showIcon: true,
        type: err.status,
        position: "bottom-right"
      })
  }
    catch (error) {
      console.error('Error storing image data in JSON:', error);
    }
  }
};

const triggerFileInput = () => {
  fileInput.value.click(); // Programmatically trigger click on file input
};

const removeImage = () => {
  image.value = null;
  fileInput.value.value = null;
};
</script>