<template>
  <p class="bg-amber-100 dark:bg-amber-900 px-6 py-4 rounded-md">
    {{ getMessage }}
  </p>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n({ useScope: "global" });

const messageSet = {
  "en_US": "No record saved in the database.",
  "zh_CN": "数据库中尚没有保存任何记录。"
}

const getMessage = computed(() => {
  return messageSet[locale.value];
})
</script>
