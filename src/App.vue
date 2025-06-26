<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <Header />
    <main class="relative z-10 pt-20 pb-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>