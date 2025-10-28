<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">T</span>
          </div>
          <span class="text-xl font-bold text-black">TicketApp</span>
        </router-link>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <template v-if="isAuthenticated">
            <router-link
              to="/dashboard"
              class="text-gray-600 hover:text-black transition-colors"
              :class="{ 'text-black font-medium': $route.name === 'dashboard' }"
            >
              Dashboard
            </router-link>
            <router-link
              to="/tickets"
              class="text-gray-600 hover:text-black transition-colors"
              :class="{ 'text-black font-medium': $route.name === 'tickets' }"
            >
              Tickets
            </router-link>
          </template>
        </nav>

        <!-- Auth Actions -->
        <div class="flex items-center space-x-4">
          <template v-if="isAuthenticated">
            <div class="flex items-center space-x-3">
              <span class="text-sm text-gray-600"> Welcome, {{ authStore.user?.name }} </span>
              <button @click="handleLogout" class="btn-secondary text-sm px-4 py-2">Logout</button>
            </div>
          </template>
          <template v-else>
            <router-link to="/auth/login" class="text-gray-600 hover:text-black transition-colors">
              Login
            </router-link>
            <router-link to="/auth/signup" class="btn-primary text-sm px-4 py-2">
              Sign Up
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

// Create a computed property that checks authentication more reliably
const isAuthenticated = computed(() => {
  return authStore.isAuthenticated && authStore.user
})

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
