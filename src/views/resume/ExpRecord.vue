<template>
  <div class="border-b-2 border-gray-200 dark:border-gray-600 mb-3 py-4 px-6 hover:bg-gray-200 dark:hover:bg-gray-600">
    <div class="flex items-center justify-between">
      <h3 class="font-bold text-lg flex items-center justify-start group">
        <span class="mr-1">{{ job.title }}</span>
        <a class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer" title="Delete selected record" @click="removeRecord">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-rose-600">
            <title>Delete selected record</title>
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </a>
      </h3>
      <span class="italic hidden md:inline-block">
        {{ getDate(job.start) }} - {{ (job.end) ? getDate(job.end) : 'Present' }}
      </span>
    </div>
    <p class="italic md:hidden">
      {{ getDate(job.start) }} - {{ (job.end) ? getDate(job.end) : 'Present' }}
    </p>
    <p class="w-full mb-3">
      {{ job.company }}
    </p>
    <p class="w-full">
      {{ job.experience }}
    </p>
  </div>
</template>

<script setup>
import { useMyAccount } from '@/stores/account';

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

import { ajaxCall, ajaxCompare, ajaxErrShow } from '@/utils/ajax';
import browserDetect from '@/utils/browser';
import { convertToDateOnly } from '@/utils/time';
import { objClone } from '@/utils/objects';

const accountStore = useMyAccount();
const browser = browserDetect();
const myStoredUaid = accountStore.profile.uaid || 0;
const myStoredUser = accountStore.profile.email || '';

const props = defineProps({
  callback: {
    type: Function,
    required: true
  },
  method: {
    type: String,
    default: ''
  },
  job: {
    type: Object,
    default: () => {
      return {
        company: 'default company',
        end: null,
        experience: 'Nothing to see here.',
        start: '1964-01-01',
        title: '',
      }
    }
  }
})
/***
 * methods
 */
/*** convert date to mm/dd/yyyy */
const getDate = (date) => {
  return convertToDateOnly(date);
}
const removeRecord = async () => {
  const ajaxData = objClone(props.job, {
      browser: browser.browser.name,
      method: "exp",
      uaid: myStoredUaid,
      user: myStoredUser,
      value: "remove"
    });
    const result = await ajaxCall({
      data: ajaxData,
      url: "resume/update"
    });
    if (ajaxCompare(result.errno, [102]) && ajaxCompare(result[props.method].errno, [1])) {
      props.callback({
        method: props.method,
        value: result[props.method]
      });
    }
    const err = ajaxErrShow(result);
    createToast(err.message, {
      showIcon: true,
      type: err.status,
      position: "bottom-right"
    });
}
</script>