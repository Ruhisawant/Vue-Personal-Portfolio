<script setup>
import { ref, computed, onMounted } from 'vue';

const formData = ref({
  name: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const isSubmitted = ref(false);
const errors = ref({});
const isVisible = ref(false);

const isFormValid = computed(() => {
  return formData.value.name.trim() && 
         formData.value.email.trim() && 
         formData.value.message.trim() &&
         isValidEmail(formData.value.email);
});

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateForm = () => {
  errors.value = {};
  
  if (!formData.value.name.trim()) {
    errors.value.name = 'Name is required';
  }
  
  if (!formData.value.email.trim()) {
    errors.value.email = 'Email is required';
  } else if (!isValidEmail(formData.value.email)) {
    errors.value.email = 'Please enter a valid email';
  }
  
  if (!formData.value.message.trim()) {
    errors.value.message = 'Message is required';
  } else if (formData.value.message.trim().length < 10) {
    errors.value.message = 'Message must be at least 10 characters';
  }
  
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    isSubmitted.value = true;
    formData.value = { name: '', email: '', message: '' };
    errors.value = {};
    
    setTimeout(() => {
      isSubmitted.value = false;
    }, 5000);
    
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  formData.value = { name: '', email: '', message: '' };
  errors.value = {};
  isSubmitted.value = false;
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 200);
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden pt-15">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
    
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 opacity-20 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-400 to-purple-500 opacity-10 rounded-full blur-3xl animate-pulse" style="animation-delay: 4s;"></div>
    </div>

    <!-- Contact Section -->
    <section id="contact" class="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
      <div class="w-full max-w-4xl mx-auto">
        <div class="flex flex-col gap-8">
          <!-- Header -->
          <div class="text-center transition-all duration-1000 ease-out" :class="{ 'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible }">
            <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
              Get In Touch
            </h1>
            <p class="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              I'd love to hear from you. Send me a message and I'll respond as soon as possible.
            </p>
          </div>

          <!-- Contact Card -->
          <div class="bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 md:p-12 transition-all duration-1000 ease-out hover:bg-slate-800/90 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-500/10 transform hover:scale-[1.02]" :class="{ 'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible }" style="transition-delay: 200ms;">
            
            <!-- Success Message -->
            <div v-if="isSubmitted" class="text-center py-8 transition-all duration-500 ease-out">
              <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-cyan-500/25">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 class="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Message Sent Successfully!
              </h3>
              <p class="text-slate-300 text-lg mb-8">
                Thank you for reaching out. I'll get back to you soon.
              </p>
              <button 
                @click="resetForm"
                class="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 relative overflow-hidden"
              >
                <span class="relative z-10">Send Another Message</span>
                <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>

            <!-- Contact Form -->
            <form v-else @submit="handleSubmit" class="space-y-8">
              <!-- Name Field -->
              <div class="form-group">
                <label class="flex items-center gap-2 mb-3 font-semibold text-lg text-cyan-300">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Full Name *
                </label>
                <input
                  v-model="formData.name"
                  type="text"
                  placeholder="Enter your full name"
                  maxlength="50"
                  class="w-full px-4 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400/50 transition-all duration-300 hover:bg-slate-700/70 backdrop-blur-sm"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.name }"
                />
                <div class="flex justify-between items-center mt-2">
                  <span v-if="errors.name" class="text-red-400 text-sm">{{ errors.name }}</span>
                  <span class="text-slate-500 text-sm ml-auto">{{ formData.name.length }}/50</span>
                </div>
              </div>

              <!-- Email Field -->
              <div class="form-group">
                <label class="flex items-center gap-2 mb-3 font-semibold text-lg text-cyan-300">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Email Address *
                </label>
                <input
                  v-model="formData.email"
                  type="email"
                  placeholder="Enter your email address"
                  maxlength="100"
                  class="w-full px-4 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400/50 transition-all duration-300 hover:bg-slate-700/70 backdrop-blur-sm"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.email }"
                />
                <span v-if="errors.email" class="text-red-400 text-sm mt-2 block">{{ errors.email }}</span>
              </div>

              <!-- Message Field -->
              <div class="form-group">
                <label class="flex items-center gap-2 mb-3 font-semibold text-lg text-cyan-300">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  Message *
                </label>
                <textarea
                  v-model="formData.message"
                  placeholder="Write your message here..."
                  rows="5"
                  maxlength="500"
                  class="w-full px-4 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400/50 transition-all duration-300 hover:bg-slate-700/70 resize-none backdrop-blur-sm"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.message }"
                ></textarea>
                <div class="flex justify-between items-center mt-2">
                  <span v-if="errors.message" class="text-red-400 text-sm">{{ errors.message }}</span>
                  <span class="text-slate-500 text-sm ml-auto">{{ formData.message.length }}/500</span>
                </div>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="!isFormValid || isSubmitting"
                class="group w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-3 relative overflow-hidden"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span class="relative z-10 flex items-center gap-3">
                  <svg v-if="isSubmitting" class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </span>
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="text-center transition-all duration-1000 ease-out" :class="{ 'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible }" style="transition-delay: 400ms;">
            <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/70 hover:border-cyan-400/30 transition-all duration-300">
              <p class="text-slate-300 text-lg mb-4">
                You can also reach out to me through social media or email directly.
              </p>
              <div class="flex justify-center gap-4">
                <div class="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-cyan-500/30 transition-all">
                  Let's Connect
                </div>
                <div class="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-300 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-purple-500/30 transition-all">
                  Always Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>