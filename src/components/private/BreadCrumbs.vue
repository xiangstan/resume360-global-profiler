<template>
  <nav class="flex mb-5" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li class="inline-flex items-center">
        <router-link to="/user/dashboard" class="inline-flex items-center text-md font-medium gap-1 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span class="capitalize">{{ $t('general.dashboard') }}</span>
        </router-link>
      </li>
      <li
        v-for="(i, idx) in items"
        :key="idx"
        :aria-current="i.url === '' ? 'page' : null"
      >
        <div
          class="inline-flex items-center"
        >
          <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
          <router-link v-if="i.url !== ''" :to="i.url" class="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white capitalize">
            {{ $t(`general.${i.name}`) }}
          </router-link>
          <span v-else class="ms-1 text-md font-medium text-gray-700 dark:text-gray-300 capitalize">
            {{ $t(`general.${i.name}`) }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>