<template>
  <div>
    <BreadCrumbs :items="bc" />
    <IsLoading v-if="isLoading" />
    <p v-else-if="isNoResume" class="rounded-md shadow-none p-5 bg-amber-500 text-slate-50">
      You haven't start building your resume yet. Click <a class="font-bold underline cursor-pointer hover:uppercase" @click="startResume">here</a> to start.
    </p>
    <form v-else-if="initResume">
      <div class="rounded-md shadow-md p-5 bg-gray-50 dark:bg-gray-700 mb-6">
        <h2 class="text-xl font-bold mb-6 capitalize">
          {{ $t('general.basic') + $t(' ') + $t('general.information') }}
        </h2>
        <div class="grid grid-cols-2 gap-8">
          <div class="relative z-0 w-full mb-5 group">
            <input v-model="formData.name" type="name" name="floating_name" id="floating_name" class="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required @blur="saveName" />
            <label for="floating_name" class="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 capitalize">
              {{ $t('general.fullname') }}
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " v-model="myStoredUser" required readonly="readonly" />
            <label for="floating_email" class="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 capitalize">
              {{ $t('general.email') + $t(' ') + $t('general.address') }}
            </label>
          </div>
        </div>
      </div>
      <!-- Experience -->
      <div class="rounded-md shadow-md p-5 bg-gray-50 dark:bg-gray-700 mb-6">
        <h2 class="flex items-end text-xl font-bold mb-6 capitalize gap-3">
          {{ $t('resume.exp') }}
          <a v-if="!showForm.exp" class="cursor-pointer hover:text-green-500" title="Add a new Working Experience" data-tar="exp" @click="addNew">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </a>
          <a v-else data-tar="exp"  class="cursor-pointer hover:text-green-500" @click="addNew">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </a>
        </h2>
        <div class="mb-5">
          <ErrorRecord v-if="+items.exp.errno !== 1" />
          <NoRecord v-else-if="+items.exp.count < 1" />
          <template v-else>
            <div v-for="(e, idx) in items.exp.errmsg" :key="idx">
              <ExpRecord
                :callback="updateRecords"
                method="exp"
                :job="e"
              />
            </div>
          </template>
        </div>
        <NewRecord v-if="showForm.exp" method="exp" key="exp" :callback="updateRecords" />
      </div>
      <!-- Education -->
      <div class="rounded-md shadow-md p-5 bg-gray-50 dark:bg-gray-700 mb-6">
        <h2 class="flex items-end text-xl font-bold mb-6 capitalize gap-3">
          {{ $t('resume.edu') }}
          <a v-if="!showForm.edu" class="cursor-pointer hover:text-green-500" title="Add a new School Record" data-tar="edu" @click="addNew">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <title>Create a new school record</title>
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </a>
          <a v-else class="cursor-pointer hover:text-green-500" data-tar="edu" @click="addNew">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </a>
        </h2>
        <div class="mb-5">
          <ErrorRecord v-if="+items.edu.errno !== 1" />
          <NoRecord v-else-if="+items.edu.count < 1" />
          <template v-else>
            {{ items.edu.errmsg }}
          </template>
        </div>
        <NewRecord v-if="showForm.edu" method="edu" key="edu" :callback="updateRecords" />
      </div>
      <div>
        <button class="cursor-pointer rounded-md shadow-md px-5 py-3 bg-emerald-400 border-emerald-600 hover:bg-green-600 hover:border-green-800 text-white capitalize disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50" :disabled="isPublishDisabled">
          {{ $t('resume.publish') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useMyAccount } from '@/stores/account';

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

import { ajaxCall, ajaxCompare, ajaxErrShow } from '@/utils/ajax';
import browserDetect from '@/utils/browser';
import { objClone } from '@/utils/objects';

import BreadCrumbs from '@/components/private/BreadCrumbs.vue';
import ErrorRecord from '@/components/commons/ErrorRecord.vue';
import ExpRecord from './ExpRecord.vue';
import IsLoading from '@/components/static/IsLoading.vue';
import NewRecord from '@/components/private/NewRecord.vue';
import NoRecord from '@/components/commons/NoRecord.vue';

const accountStore = useMyAccount();
const browser = browserDetect();
const myStoredUaid = accountStore.profile.uaid || 0;
const myStoredUser = accountStore.profile.email || '';
const myStoredName = accountStore.profile.name;
const localStoredUser = localStorage.getItem(import.meta.env.VITE_APP_SITE_SHORT + "User");

const preFormDataset = {
  browser: browser.browser.name,
  email: myStoredUser,
  uaid: myStoredUaid
};

const items = ref({});
const bc = ref([
  { name: 'resume', url: '' }
]);
const formData = reactive(objClone(preFormDataset));
const isLoading = ref(true);
const isNoResume = ref(false);
const initResume = ref(false);
const showForm = reactive({
  edu: false,
  exp: false
});
const isPublishDisabled = computed(() => {
  let temp = true;
  const dataSet = items.value;
  if (typeof dataSet.edu !== 'undefined' && ajaxCompare(dataSet.edu.errno, [1]) && +dataSet.edu.count > 0 && typeof dataSet.exp !== 'undefined' && ajaxCompare(dataSet.eexp.errno, [1]) && +dataSet.eexp.count > 0 ) {
    temp = false;
  }
  return temp;
})
/***
 * methods
 */
const initFetch = async () => {
  if (myStoredUser === localStoredUser) {
    if (myStoredName) {
      const ajaxData = {
        uaid: myStoredUaid
      };
      const result = await ajaxCall({
        data: ajaxData,
        url: "resume/fetch"
      });
      items.value = result;
      formData.name = myStoredName;
      initResume.value = true;
    }
    else {
      isNoResume.value = true;
    }
    isLoading.value = false
  }
  else {
    console.warn("Not logged in")
  }
}
/*** start building resume */
const startResume = () => {
  isNoResume.value = false;
  initResume.value = true;
}
/*** open new experience/education form */
const addNew = (e) => {
  if (myStoredName) {
    const dataSet = e.currentTarget.dataset;
    showForm[dataSet.tar] = !showForm[dataSet.tar];
  }
  else {
    createToast('You need to save your name first', {
      showIcon: true,
      type: 'warning',
      position: 'bottom-right'
    });
  }
}
/*** save user's name' */
const saveName = async () => {
  if (typeof formData.name !== "undefined" && formData.name.length > 0 && formData.name !== myStoredName) {
    const ajaxData = objClone(formData, {
      method: "name",
      value: formData.name
    });
    const result = await ajaxCall({
      data: ajaxData,
      url: "user/update"
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
  else {
    console.log("Nothing changed")
  }
}
/*** update records from NewRecord template */
const updateRecords = (result) => {
  items.value[result.method] = result.value;
  showForm[result.method] = false;
}

onMounted(() => {
  initFetch();
})
</script>