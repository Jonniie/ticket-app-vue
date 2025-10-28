<template>
  <footer class="bg-gray-50 border-t border-gray-200">
    <div class="container-custom py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">T</span>
            </div>
            <span class="text-xl font-bold text-black">TicketApp</span>
          </div>
          <p class="text-gray-600 text-sm">
            A modern ticket management system built with Vue.js and Tailwind CSS.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold text-black mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-600 hover:text-black transition-colors text-sm">
                Home
              </router-link>
            </li>
            <li v-if="isAuthenticated">
              <router-link to="/dashboard" class="text-gray-600 hover:text-black transition-colors text-sm">
                Dashboard
              </router-link>
            </li>
            <li v-if="isAuthenticated">
              <router-link to="/tickets" class="text-gray-600 hover:text-black transition-colors text-sm">
                Tickets
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="font-semibold text-black mb-4">Support</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-gray-600 hover:text-black transition-colors text-sm">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 hover:text-black transition-colors text-sm">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 hover:text-black transition-colors text-sm">
                Documentation
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-200 mt-8 pt-8 text-center">
        <p class="text-gray-500 text-sm">
          © 2024 TicketApp. Built with Vue.js and Tailwind CSS.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Create a computed property that checks authentication more reliably
const isAuthenticated = computed(() => {
  return authStore.isAuthenticated && authStore.user
})
</script>
