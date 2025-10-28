<template>
  <div class="card">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600">{{ title }}</p>
        <p class="text-2xl font-bold text-black">{{ value }}</p>
        <div v-if="change" class="flex items-center mt-1">
          <component 
            :is="changeType === 'up' ? TrendingUp : TrendingDown" 
            class="w-4 h-4 mr-1"
            :class="changeType === 'up' ? 'text-green-500' : 'text-red-500'"
          />
          <span 
            class="text-sm font-medium"
            :class="changeType === 'up' ? 'text-green-600' : 'text-red-600'"
          >
            {{ change }}
          </span>
        </div>
      </div>
      <div 
        class="w-12 h-12 rounded-lg flex items-center justify-center"
        :class="getIconBgColor(color)"
      >
        <component :is="icon" class="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrendingUp, TrendingDown } from 'lucide-vue-next'

interface Props {
  title: string
  value: number
  icon: any
  color: 'black' | 'green' | 'amber' | 'gray'
  change?: string
  changeType?: 'up' | 'down'
}

defineProps<Props>()

const getIconBgColor = (color: string) => {
  switch (color) {
    case 'black':
      return 'bg-black'
    case 'green':
      return 'bg-green-500'
    case 'amber':
      return 'bg-amber-500'
    case 'gray':
      return 'bg-gray-500'
    default:
      return 'bg-gray-500'
  }
}
</script>
