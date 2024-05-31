<template>
  <section class="bg-black text-gray-200 py-16">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-4">
      <div class="w-full md:w-2/5 items-center justify-center">
        <h2 class="text-4xl font-bold mb-4">Contact Us Today</h2>
        <p class="mb-6">Reach out to us with any questions or requests. We are here to help you with your digital marketing needs.</p>
      </div>
      <div class="w-full md:w-1/2 items-center justify-center">
        <form @submit.prevent="submitForm" class="bg-gray-800 p-8 rounded-lg shadow-lg w-full">
          <div class="mb-4">
            <label for="name" class="block mb-2 font-bold">Name</label>
            <input type="text" id="name" v-model="form.name" required class="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="email" class="block mb-2 font-bold">Email</label>
            <input type="email" id="email" v-model="form.email" required class="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-6">
            <label for="message" class="block mb-2 font-bold">Message</label>
            <textarea id="message" v-model="form.message" required class="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 h-24 resize-none"></textarea>
          </div>
          <button type="submit" class="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600">Submit</button>
          <p v-if="errorMessages" class="text-red-500 mt-4">{{ errorMessages }}</p>
          <p v-if="successMessages" class="text-green-500 mt-4">{{ successMessages }}</p>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "ContactView",
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
      errorMessages: "",
      successMessages: ""
    };
  },
  methods: {
    
    submitForm() {
      alert("Message sent!");
      // Handle form submission logic here
    },
    /** add method that cannot send out email */
    /**Install Axios (if you haven't already):

intall:

npm install axios

Update the submitForm Method:
Use Axios to send the form data to your backend server.

Complete Script with Axios:

import axios from 'axios';

export default {
  name: "ContactForm",
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
      errorMessages: "",
      successMessages: ""
    };
  },
  methods: {
    async submitForm() {
      try {
        // Send a POST request to your backend server
        const response = await axios.post('https://your-backend-api.com/contact', this.form);
        
        // If submission is successful
        this.successMessages = 'Message sent successfully!';
        this.errorMessages = '';
      } catch (error) {
        // If there is an error
        this.errorMessages = 'Unable to send email. Please try again later.';
        this.successMessages = '';
      }
    }
  }
}; */
  },
};
</script>
