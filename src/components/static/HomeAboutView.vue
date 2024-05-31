<template>
  <div class="home-view">
    <!-- Enhance Your Career with Resume360 Section -->
    <section class="career-section bg-cover bg-center text-white flex flex-col items-center justify-center" style="background-image: url('src/assets/img/work.jpg'); min-height: 100vh;">
      <div class="content text-center">
        <h2 class="text-5xl mb-2">Enhance Your Career with Resume360</h2>
        <p class="text-xl mb-6">Boost your career prospects with our comprehensive resume building and profiling services.</p>
        <p class="text-xl mb-8">Leverage our global profiling services to stand out in the competitive job market.</p>
        <div class="buttons flex justify-center gap-5">
          <router-link
            to="/contact#contact-section" 
            class="btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-slate-200 hover:text-gray-800 transition-all duration-500 ease-in-out">
            Get Started
          </router-link>
          <button class="btn-secondary bg-transparent text-white border border-white py-2 px-4 rounded" @click="scrollToContact">Contact Us</button>
        </div>
      </div>
    </section>

    <!-- Resume360 Global Profiler Section -->
    <section class="profiler-section bg-gray-600 text-gray-200 flex flex-col items-center justify-center" style="min-height: 50vh;">
      <div class="content text-center">
        <h2 class="text-4xl mb-4">Resume360 Global Profiler</h2>
        <p class="text-xl mb-8">Welcome to Resume360 Global profile, revolutionary project at the intersection of AI and Blockchain technologies. This project aims to leverage the power of decentralized ledger technology to securely register, store, and search resumes as unique non-fungible tokens (NFTs) on the blockchain.</p>
      </div>
    </section>
  

    <!-- Photo Section -->
    <section class="profiler-section bg-gray-600 text-gray-200 bg-cover bg-center flex flex-col items-center justify-center" style="background-image: url('src/assets/img/building.jpg'); min-height: 50vh;">

    </section>

    <!-- Services Section -->
    <section class="bg-gray-600 text-gray-200 py-16">
      <div class="container mx-auto text-center">
        <h2 class="text-4xl font-bold mb-12">Our Services</h2>
        <div class="flex flex-wrap justify-center gap-24">
          <!-- Service 1 -->
          <div class="max-w-xs flex flex-col items-center">
            <img src="@/assets/img/Affiliate.svg" alt="Social Media Management" class="w-20 h-20 mb-4">
            <h3 class="text-2xl font-semibold mb-2">NFT Representation</h3>
            <p class="text-base">Resumes are tokenized into NFTs upon registration, enabling unique ownership and verification of resume authenticity.</p>
          </div>
          <!-- Service 2 -->
          <div class="max-w-xs flex flex-col items-center">
            <img src="@/assets/img/Database.svg" alt="SEO Optimization" class="w-20 h-20 mb-4">
            <h3 class="text-2xl font-semibold mb-2">AI-Powered Attribute Extraction</h3>
            <p class="text-base">AI algorithms analyze resumes to extract essential keywords and attributes, enhancing searchability and relevance.</p>
          </div>
          <!-- Service 3 -->
          <div class="max-w-xs flex flex-col items-center">
            <img src="@/assets/img/Comparison.svg" alt="Email Marketing Campaigns" class="w-20 h-20 mb-4">
            <h3 class="text-2xl font-semibold mb-2">Smart Contract Verification</h3>
            <p class="text-base">Smart contracts validate the legitimacy of resumes before minting them as NFTs on the blockchain.</p>
          </div>
          <!-- Service 4 -->
          <div class="max-w-xs flex flex-col items-center">
            <img src="@/assets/img/User Security.svg" alt="Email Marketing Campaigns" class="w-20 h-20 mb-4">
            <h3 class="text-2xl font-semibold mb-2">Blockchain Integrity</h3>
            <p class="text-base">The blockchain ensures tamper-proof storage and traceability of resumes and their associated metadata.</p>
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
        <h2 class="text-4xl font-bold mb-4">About Us</h2>
        <p class="mb-4">We are a design group in Colorado Springs, CO. Our team is dedicated to helping recruiters and candidates find their best options online.</p>
        <p>Resume360 Global Profiler leverages blockchain technology to create a secure and immutable repository for resumes. Each resume is transformed into a unique NFT, with AI algorithms employed to summarize and extract key attributes. The NFTs store these attributes within their smart contracts, facilitating efficient and accurate resume searches.</p>
      </div>
    </div>
  </section>

  <!-- Team Member -->
  <section class="bg-gray-600 text-gray-200 py-16">
      <div class="container mx-auto text-center">
        <h2 class="text-4xl font-bold mb-12">Our Team</h2>
        <div class="flex flex-wrap justify-center gap-24">
          <!-- Tan -->
          <div class="max-w-xs flex flex-col items-center">
            <img src="@/assets/img/Tan.jpg" alt="Social Media Management" class="w-20 h-20 mb-4 rounded-full">
            <h3 class="text-2xl font-semibold mb-2">Xiang Tan</h3>
            <p class="text-base">Web 2.0, Web 3.0 developer</p>
          </div>
          <!-- Jason -->
          <div class="max-w-xs flex flex-col items-center">
            <img src="@/assets/img/zq.jpg" alt="Email Marketing Campaigns" class="w-20 h-20 mb-4 rounded-full">
            <h3 class="text-2xl font-semibold mb-2">Zhenqi Liu</h3>
            <p class="text-base">Backend developer</p>
          </div>
          <!-- Lin -->
          <div class="max-w-xs flex flex-col items-center">
            <img src="@/assets/img/zl.jpg" alt="Email Marketing Campaigns" class="w-20 h-20 mb-4 rounded-full">
            <h3 class="text-2xl font-semibold mb-2">Zhenyu Lin</h3>
            <p class="text-base">Frontend developer</p>
          </div>
          <!-- Zhao -->
          <div class="max-w-xs flex flex-col items-center">
            <img src="@/assets/img/zj.jpg" alt="Email Marketing Campaigns" class="w-20 h-20 mb-4 rounded-full">
            <h3 class="text-2xl font-semibold mb-2">Dr. Junxian Zhao</h3>
            <p class="text-base">AI, API developer</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>


<script>
export default {
  name: "HomeAboutView",
  methods: {
    /**Founction to let the button scroll to Contact Us */
    scrollToContact() {
      const contactSection = document.getElementById('contact-us');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>

<style scoped>
/* Scoped styles if needed */
</style>
