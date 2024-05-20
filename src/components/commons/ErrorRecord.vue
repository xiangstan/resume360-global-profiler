<template>
  <p class="bg-rose-600 text-slate-100 px-6 py-4 rounded-md">
    {{ getMessage }}
  </p>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n({ useScope: "global" });

const messageSet = {
  "en_US": "Error loading dta from the database.",
  "zh_CN": "数据库加载数据时出错。"
}

const getMessage = computed(() => {
  return messageSet[locale.value];
})
</script>
