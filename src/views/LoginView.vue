<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="flex justify-center">
          <div class="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">T</span>
          </div>
        </div>
        <h2 class="mt-6 text-3xl font-bold text-black">
          Sign in to your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <router-link 
            to="/auth/signup" 
            class="font-medium text-black hover:text-gray-800 transition-colors"
          >
            create a new account
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
          <AlertCircle class="w-5 h-5 text-red-600 shrink-0" />
          <span class="text-red-800 text-sm">{{ error }}</span>
        </div>

        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              autocomplete="email"
              required
              class="input-field"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="input-field pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeOff v-if="showPassword" class="w-5 h-5 text-gray-400" />
                <Eye v-else class="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="formData.rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-black hover:text-gray-800 transition-colors">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, AlertCircle } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'

const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()

const formData = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const showPassword = ref(false)
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    const result = await authStore.login(formData.email)
    
    if (result.success) {
      toastStore.showSuccess('Login successful! Welcome back.')
      router.push('/dashboard')
    } else {
      error.value = result.error || 'Login failed'
      toastStore.showError(result.error || 'Login failed')
    }
  } catch (err) {
    const errorMessage = 'An unexpected error occurred. Please try again.'
    error.value = errorMessage
    toastStore.showError(errorMessage)
    console.error('Login failed:', err)
  } finally {
    loading.value = false
  }
}
</script>
