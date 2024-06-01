<script setup>
import { computed, reactive, ref } from 'vue';
import { useMyAccount } from '@/stores/account';

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
import { useVuelidate } from '@vuelidate/core';
import { required, requiredIf } from '@vuelidate/validators';

import { ajaxCall, ajaxCompare, ajaxErrShow } from '@/utils/ajax';
import browserDetect from '@/utils/browser';
import { objClone } from '@/utils/objects';
import { textCount } from '@/utils/strings';

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
  }
})

const formData = reactive({
  title: '',
  company: '',
  degree: '',
  school: '',
  start: '',
  end: '',
  experience: '',
  achievement: ''
});
const rules = {
  title: { requiredIf: requiredIf(() => props.method === 'exp') },
  company: { requiredIf: requiredIf(() => props.method === 'exp') },
  degree: { requiredIf: requiredIf(() => props.method === 'edu') },
  school: { requiredIf: requiredIf(() => props.method === 'edu') },
  start: { required },
  experience: { requiredIf: requiredIf(() => props.method === 'exp') },
  achievement: { requiredIf: requiredIf(() => props.method === 'edu') }
}
const v$ = useVuelidate(rules, formData);

const entityLimits = ref(255);
const inputLimits = ref(128);
const textareaLimits = ref(5000);

const companyCount = computed(() => {
  return textCount(formData.company, entityLimits.value)
});
const schoolCount = computed(() => {
  return textCount(formData.school, entityLimits.value)
});
const degreeCount = computed(() => {
  return textCount(formData.degree, inputLimits.value)
});
const titleCount = computed(() => {
  return textCount(formData.title, inputLimits.value)
});
const achievementCount = computed(() => {
  return textCount(formData.achievement, textareaLimits.value)
});
const experienceCount = computed(() => {
  return textCount(formData.experience, textareaLimits.value)
});

/***
 * methods
 */
const saveForm = async (e) => {
  e.preventDefault();
  v$.value.$touch();
  if (v$.value.$error) {
    const errMsg = ajaxErrShow({
      errno: 8,
      status: "warning"
    });
    createToast(errMsg.message, {
      showIcon: true,
      type: errMsg.status,
      position: "bottom-right"
    });
    return
  }
  else {
    const ajaxData = objClone(formData, {
      browser: browser.browser.name,
      method: props.method,
      uaid: myStoredUaid,
      user: myStoredUser,
      value: "add"
    });
    const result = await ajaxCall({
      data: ajaxData,
      url: "resume/update"
    });
    if (ajaxCompare(result.errno, [100]) && ajaxCompare(result[props.method].errno, [1])) {
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
}
</script>

<template>
  <div class="border-2 rounded-md p-6 shadow-inner mb-4">
    <div v-if="method === 'exp'" class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      <div>
        <div class="flex items-center justify-between mb-2">
          <label for="form-title" class="block text-md font-bold text-gray-900 dark:text-white capitalize">
            {{ $t('resume.job_title') }}
          </label>
          <span class="italic">
            {{ titleCount }}
          </span>
        </div>
        <input
          v-model="formData.title"
          type="text"
          id="form-title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :class="{ 'border-rose-600': v$.title.$error }"
          :maxlength="inputLimits"
          placeholder="Web3 Developer"
          @input="v$.title.$reset"
        />
      </div>
      <div>
        <div class="flex items-center justify-between mb-2">
          <label for="form-company" class="block text-md font-bold text-gray-900 dark:text-white capitalize">
            {{ $t('resume.company') }}
          </label>
          <span class="italic">
            {{ companyCount }}
          </span>
        </div>
        <input
          v-model="formData.company"
          type="text"
          id="form-company"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :class="{ 'border-rose-600': v$.company.$error }"
          :maxlength="entityLimits"
          placeholder="Company ABC"
          @input="v$.company.$reset"
        />
      </div>
    </div>

    <div v-if="method === 'edu'" class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      <div>
        <div class="flex items-center justify-between mb-2">
          <label for="form-degree" class="block text-md font-bold text-gray-900 dark:text-white capitalize">
            {{ $t('resume.degree') }}
          </label>
          <span class="italic">
            {{ degreeCount }}
          </span>
        </div>
        <input
          v-model="formData.degree"
          type="text"
          id="form-degree"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :class="{ 'border-rose-600': v$.degree.$error }"
          :maxlength="inputLimits"
          placeholder="MS Computer Science"
          @input="v$.degree.$reset"
        />
      </div>
      <div>
        <div class="flex items-center justify-between mb-2">
          <label for="form-school" class="block text-md font-bold text-gray-900 dark:text-white capitalize">
            {{ $t('resume.school') }}
          </label>
          <span class="italic">
            {{ schoolCount }}
          </span>
        </div>
        <input
          v-model="formData.school"
          type="text"
          id="form-school"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :class="{ 'border-rose-600': v$.school.$error }"
          :maxlength="entityLimits"
          placeholder="MIT"
          @input="v$.school.$reset"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
      <div>
        <label for="form-start" class="block mb-2 text-md font-bold text-gray-900 dark:text-white capitalize">
          {{ $t('resume.start') + $t(' ') + $t('resume.date') }}
        </label>
        <input
          v-model="formData.start"
          type="date"
          id="form-start"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :class="{ 'border-rose-600': v$.start.$error }"
          @input="v$.start.$reset"
        />
      </div>
      <div>
        <label for="form-end" class="block mb-2 text-md font-bold text-gray-900 dark:text-white capitalize">
          {{ $t('resume.end') + $t(' ') + $t('resume.date') }}
        </label>
        <input
          v-model="formData.end" type="date" id="form-end" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
    <div v-if="method === 'exp'" class="mb-5">
      <div class="flex items-center justify-between mb-2">
        <label for="form-experience" class="block text-md font-bold text-gray-900 dark:text-white capitalize">
          {{ $t('resume.exp') }}
        </label>
        <span class="italic">
          {{ experienceCount }}
        </span>
      </div>
      <textarea
        v-model="formData.experience"
        id="form-experience"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :class="{ 'border-rose-600': v$.experience.$error }"
        :maxlength="textareaLimits"
        placeholder="Leave a comment..."
        @input="v$.experience.$reset"
      />
    </div>
    <div v-if="method === 'edu'" class="mb-5">
      <div class="flex items-center justify-between mb-2">
        <label for="form-achievement" class="block mb-2 text-md font-bold text-gray-900 dark:text-white capitalize">
          {{ $t('resume.academic') + $t(' ') + $t('resume.work') }}
        </label>
        <span class="italic">
          {{ achievementCount }}
        </span>
      </div>
      <textarea
        v-model="formData.achievement"
        id="form-achievement"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :class="{ 'border-rose-600': v$.achievement.$error }"
        :maxlength="textareaLimits"
        placeholder="Leave a comment..."
        @input="v$.achievement.$reset"
      />
    </div>
    <button class="cursor-pointer rounded-md shadow-md px-5 py-3 bg-emerald-400 border-emerald-600 hover:bg-green-600 hover:border-green-800 text-white capitalize disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50" @click="saveForm">
      {{ $t('resume.save') }}
    </button>
  </div>
</template>
