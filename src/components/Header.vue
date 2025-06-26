<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <router-link to="/" class="text-xl font-bold text-gray-800 hover:text-blue-600">
            MyApp
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex space-x-6">
          <router-link 
            to="/" 
            class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors"
            active-class="text-blue-600 font-medium"
          >
            Home
          </router-link>
          <router-link 
            to="/contact" 
            class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors"
            active-class="text-blue-600 font-medium"
          >
            Contact
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button 
            @click="toggleMobileMenu"
            class="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4 border-t border-gray-200">
        <div class="flex flex-col space-y-2 pt-4">
          <router-link 
            to="/" 
            @click="closeMobileMenu"
            class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors"
            active-class="text-blue-600 font-medium"
          >
            Home
          </router-link>
          <router-link 
            to="/about" 
            @click="closeMobileMenu"
            class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors"
            active-class="text-blue-600 font-medium"
          >
            About
          </router-link>
          <router-link 
            to="/contact" 
            @click="closeMobileMenu"
            class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors"
            active-class="text-blue-600 font-medium"
          >
            Contact
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Header',
  setup() {
    const mobileMenuOpen = ref(false)

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      mobileMenuOpen.value = false
    }

    return {
      mobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu
    }
  }
}
</script>