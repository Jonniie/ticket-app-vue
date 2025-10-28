<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-9999 space-y-2">
      <TransitionGroup name="toast" tag="div">
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          class="max-w-sm w-full min-w-[200px] bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-gray-200 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="shrink-0">
                <component
                  :is="getToastIcon(toast.type)"
                  :class="getIconClasses(toast.type)"
                  class="h-5 w-5"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  {{ toast.message }}
                </p>
              </div>
              <div class="ml-4 shrink-0 flex">
                <button
                  @click="toastStore.removeToast(toast.id)"
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span class="sr-only">Close</span>
                  <X class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div :class="getStatusBarClasses(toast.type)" class="h-1"></div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-vue-next'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()

const getIconClasses = (type: string) => {
  switch (type) {
    case 'success':
      return 'text-green-500'
    case 'error':
      return 'text-red-500'
    case 'warning':
      return 'text-yellow-500'
    case 'info':
      return 'text-blue-500'
    default:
      return 'text-gray-500'
  }
}

const getStatusBarClasses = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'info':
      return 'bg-blue-500'
    default:
      return 'bg-gray-500'
  }
}

const getToastIcon = (type: string) => {
  switch (type) {
    case 'success':
      return CheckCircle
    case 'error':
      return XCircle
    case 'warning':
      return AlertTriangle
    case 'info':
      return Info
    default:
      return Info
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
