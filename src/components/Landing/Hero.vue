<template>
  <section class="relative overflow-hidden wave-bg">
    <!-- Decorative elements -->
    <div class="decorative-circle w-32 h-32 bg-black top-20 left-10"></div>
    <div class="decorative-circle w-24 h-24 bg-gray-400 top-40 right-20"></div>
    <div class="decorative-circle w-16 h-16 bg-black bottom-20 left-1/3"></div>
    
    <div class="container-custom py-20 relative z-10">
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-6xl font-bold text-black mb-6 text-balance">
          Modern Ticket Management
          <span class="block text-gray-600">Made Simple</span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-balance">
          Streamline your workflow with our intuitive ticket management system. 
          Track, organize, and resolve issues efficiently.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/auth/signup" class="btn-primary text-lg px-8 py-4">
            Get Started Free
          </router-link>
          <router-link to="/auth/login" class="btn-secondary text-lg px-8 py-4">
            Sign In
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Hero section component
</script>
