<template>
  <div class="home-view">
    <!-- Enhance Your Career with Resume360 Section -->
    <section class="career-section bg-cover bg-center bg-fixed text-white flex flex-col items-center justify-center relative min-h-[100vh]">
      <div class="absolute top-0 right-0 left-0 bottom-0 z-0 dark:brightness-50" style="background-image: url('src/assets/img/work.jpg');"></div>
      <div class="content text-center absolute z-5">
        <h2 class="text-5xl mb-12">
          {{ getMessage.hero_title }}
        </h2>
        <p class="text-xl mb-2">
          {{ getMessage.hero_header_1 }}
        </p>
        <p class="text-xl mb-8">
          {{ getMessage.hero_header_2 }}
        </p>
        <div class="buttons flex flex-col md:flex-row item-center justify-center gap-3 px-[10%] sm:px-[30%] md:px-0">
          <button 
            v-if="!appStore.isInternal"
            @click="showLoginModal"
            class="w-full sm:w-auto capitalize cursor-pointer py-2 px-4 bg-orange-600 hover:bg-orange-400 text-orange-100 hover:text-gray-900 rounded transition duration-300">
            {{ $t('general.get_start') }}
          </button>
          <button class="w-full sm:w-auto capitalize btn-secondary bg-transparent text-white border border-white hover:border-orange-500 hover:text-orange-300 hover:bg-orange-800 py-2 px-4 rounded transition duration-300" @click="scrollToContact">
            {{ $t('general.contact_us') }}
          </button>
        </div>
      </div>
    </section>

    <!-- Resume360 Global Profiler Section -->
    <section id="profile-section" class="bg-gray-100 dark:bg-gray-700 flex flex-col items-center justify-center" style="min-height: 50vh;">
      <div class="content text-center max-w-screen-lg mx-auto">
        <h2 class="text-4xl mb-8">
          Resume360 Global Profiler
        </h2>
        <p class="text-xl mb-8">
          {{ getMessage.intro }}
        </p>
      </div>
    </section>
  

    <!-- Photo Section -->
    <section class="profiler-section bg-gray-600 text-gray-200 bg-cover bg-center bg-fixed min-h-[50vh]" style="background-image: url('src/assets/img/building.jpg');">

    </section>

    <!-- Services Section -->
    <section id="services-section" class="bg-gray-600 text-gray-200 py-16">
      <div class="container mx-auto text-center">
        <h2 class="text-4xl font-bold mb-12 capitalize">
          {{ $t('general.our') + $t(' ') + $t('general.services') }}
        </h2>
        <div class="flex flex-wrap justify-center gap-24">
          <!-- Service 1 -->
          <div class="max-w-xs flex flex-col items-center">
            <img src="@/assets/img/Affiliate.svg" alt="NFT Representation" class="w-20 h-20 mb-4">
            <h3 class="text-2xl font-semibold mb-2">
              {{ getMessage.service.nft_title }}
            </h3>
            <p class="text-base">
              {{ getMessage.service.nft_desc }}
            </p>
          </div>
          <!-- Service 2 -->
          <div class="max-w-xs flex flex-col items-center">
            <img src="@/assets/img/Database.svg" alt="AI-Powered Attribute Extraction" class="w-20 h-20 mb-4">
            <h3 class="text-2xl font-semibold mb-2">
              {{ getMessage.service.ai_title }}
            </h3>
            <p class="text-base">
              {{ getMessage.service.ai_desc }}
            </p>
          </div>
          <!-- Service 3 -->
          <div class="max-w-xs flex flex-col items-center">
            <img src="@/assets/img/Comparison.svg" alt="Smart Contract Verification" class="w-20 h-20 mb-4">
            <h3 class="text-2xl font-semibold mb-2">
              {{ getMessage.service.contract_title }}
            </h3>
            <p class="text-base">
              {{ getMessage.service.contract_desc }}
            </p>
          </div>
          <!-- Service 4 -->
          <div class="max-w-xs flex flex-col items-center">
            <img src="@/assets/img/User Security.svg" alt="Blockchain Integrity" class="w-20 h-20 mb-4">
            <h3 class="text-2xl font-semibold mb-2">
              {{ getMessage.service.blockchain_title }}
            </h3>
            <p class="text-base">
              {{ getMessage.service.blockchain_desc }}
            </p>
          </div>
        </div>
      </div>
    </section>
  
    <section class="bg-black text-white py-16">
      <div class="container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 px-4">
        <div class="w-full md:w-1/2">
          <img src="@/assets/img/light.jpg" alt="About Us Image" class="rounded-lg shadow-lg w-full h-auto">
        </div>
        <div class="w-full md:w-1/2 text-left">
          <h2 class="text-4xl font-bold mb-4 capitalize">
            {{ $t('general.about_us') }}
          </h2>
          <p class="mb-4">
            {{ getMessage.aboutus_1 }}
          </p>
          <p>
            {{ getMessage.aboutus_2 }}
          </p>
        </div>
      </div>
    </section>

    <!-- Team Member -->
    <section class="bg-gray-600 text-gray-200 py-16">
      <div class="container mx-auto text-center flex flex-col">
        <h2 class="text-4xl font-bold mb-12 capitalize">
          {{ $t('general.our') + $t(' ') + $t('general.team') }}
        </h2>
        <div class="flex flex-wrap justify-center gap-24 lg:gap-0">
          <!-- Tan -->
          <div class="w-full md:w-1/2 lg:w-1/4 flex flex-col items-center">
            <img src="@/assets/img/Tan.jpg" alt="Social Media Management" class="w-20 h-20 mb-4 rounded-full">
            <h3 class="text-2xl font-semibold mb-2">
              {{ getMessage.team.member_1 }}
            </h3>
            <p class="text-base">Web 2.0, Web 3.0 developer</p>
          </div>
          <!-- Jason -->
          <div class="w-full md:w-1/2 lg:w-1/4 flex flex-col items-center">
            <img src="@/assets/img/zq.jpg" alt="Email Marketing Campaigns" class="w-20 h-20 mb-4 rounded-full">
            <h3 class="text-2xl font-semibold mb-2">
              {{ getMessage.team.member_2 }}
            </h3>
            <p class="text-base">Backend developer</p>
          </div>
          <!-- Lin -->
          <div class="w-full md:w-1/2 lg:w-1/4 flex flex-col items-center">
            <img src="@/assets/img/zl.jpg" alt="Email Marketing Campaigns" class="w-20 h-20 mb-4 rounded-full">
            <h3 class="text-2xl font-semibold mb-2">
              {{ getMessage.team.member_3 }}
            </h3>
            <p class="text-base">Frontend developer</p>
          </div>
          <!-- Zhao -->
          <div class="w-full md:w-1/2 lg:w-1/4 flex flex-col items-center">
            <img src="@/assets/img/zj.jpg" alt="Email Marketing Campaigns" class="w-20 h-20 mb-4 rounded-full">
            <h3 class="text-2xl font-semibold mb-2">
              {{ getMessage.team.member_4 }}
            </h3>
            <p class="text-base">AI, API developer</p>
          </div>
        </div>
      </div>
    </section>

    <section id="contact-us">
      <ContactView />
    </section>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';
import { useShowStore } from '@/stores/show';

import { useI18n } from 'vue-i18n';
const { locale } = useI18n({ useScope: "global" });

import ContactView from './ContactView.vue';

const messageSet = {
  "en_US": {
    'aboutus_1': 'We are a design group in Colorado Springs, CO. Our team is dedicated to helping recruiters and candidates find their best options online.',
    'aboutus_2': 'Resume360 Global Profiler leverages blockchain technology to create a secure and immutable repository for resumes. Each resume is transformed into a unique NFT, with AI algorithms employed to summarize and extract key attributes. The NFTs store these attributes within their smart contracts, facilitating efficient and accurate resume searches.',
    'hero_title': 'Enhance Your Career with Resume360 Global Profiler',
    'hero_header_1': 'Boost your career prospects with our comprehensive resume building and profiling services.',
    'hero_header_2': 'Leverage our global blockchain profiling services to stand out in the competitive job market.',
    'intro': 'Welcome to Resume360 Global profile, revolutionary project at the intersection of AI and Blockchain technologies. This project aims to leverage the power of decentralized ledger technology to securely register, store, and search resumes as unique non-fungible tokens (NFTs) on the blockchain.',
    'service': {
      'ai_title': 'AI-Powered Attribute Extraction',
      'ai_desc': 'AI algorithms analyze resumes to extract essential keywords and attributes, enhancing searchability and relevance.',
      'blockchain_title': 'Blockchain Integrity',
      'blockchain_desc': 'The blockchain ensures tamper-proof storage and traceability of resumes and their associated metadata.',
      'contract_title': 'Smart Contract Verification',
      'contract_desc': 'Smart contracts validate the legitimacy of resumes before minting them as NFTs on the blockchain.',
      'nft_title': 'NFT Representation',
      'nft_desc': 'Resumes are tokenized into NFTs upon registration, enabling unique ownership and verification of resume authenticity.',
    },
    'team': {
      'member_1': 'Xiang S Tan',
      'member_2': 'Zhenqi Liu',
      'member_3': 'Zhenyu Lin',
      'member_4': 'Dr. Junxian Zhao'
    }
  },
  "zh_CN": {
    'aboutus_1': '我们是科罗拉多斯普林斯（Colorado Springs，CO）的设计团队。我们的团队致力于帮助招聘人员和求职者在线找到最佳选择。',
    'aboutus_2': 'Resume360 Global Profiler利用区块链技术创建了一个安全不可篡改的简历存储库。每份简历都被转化为独特的NFT，使用AI算法进行摘要和关键属性提取。这些NFT在智能合约中存储这些属性，促进高效准确的简历搜索。',
    'hero_title': '通过Resume360 Global Profiler提升你的职业生涯',
    'hero_header_1': '通过我们的全面简历制作和个人档案服务提升你的职业前景。',
    'hero_header_2': '利用我们的区块链全球档案服务在竞争激烈的就业市场中脱颖而出。',
    'intro': '欢迎来到Resume360 Global Profiler全球档案，这是一个处于 AI 和区块链技术交汇处的革命性项目。该项目旨在利用去中心化账本技术的力量，将简历以独特的非同质化代币 (NFT) 的形式安全地注册、存储和搜索在区块链上。',
    'service': {
      'ai_title': 'AI驱动的属性提取',
      'ai_desc': 'AI算法分析简历以提取关键关键词和属性，增强搜索性和相关性。',
      'blockchain_title': '区块链完整性检验',
      'blockchain_desc': '区块链确保简历及其关联的元数据的防篡改存储和可追溯性。',
      'contract_title': '智能合约验证',
      'contract_desc': '智能合约在将简历铸造为区块链上的NFT之前验证其合法性。',
      'nft_title': 'NFT展示',
      'nft_desc': '把简历铸造为具有个人特色的NFT，从而实现简历唯一所有权和真实性验证。',
    },
    'team': {
      'member_1': '檀香山',
      'member_2': '刘镇齐',
      'member_3': '林振宇',
      'member_4': '赵俊先'
    }
  }
}
const getMessage = computed(() => {
  return messageSet[locale.value];
})


// Use the stores
const appStore = useAppStore();
const showStore = useShowStore();

// Function to show the login modal
const showLoginModal = () => {
  showStore.updateShow({
    key: "loginModal",
    value: !showStore.loginModal
  });
};

// Function to scroll to contact section
const scrollToContact = () => {
  const contactSection = document.getElementById('contact-us');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
/* Scoped styles if needed */
</style>
