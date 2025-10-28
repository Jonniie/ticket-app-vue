<template>
  <div class="card hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-black mb-2">{{ ticket.title }}</h3>
        <p v-if="ticket.description" class="text-gray-600 text-sm mb-3 line-clamp-2">
          {{ ticket.description }}
        </p>
        <div class="flex items-center space-x-4 text-sm text-gray-500">
          <span>Created {{ formatDate(ticket.createdAt) }}</span>
          <span v-if="ticket.updatedAt !== ticket.createdAt">
            Updated {{ formatDate(ticket.updatedAt) }}
          </span>
        </div>
      </div>
      <div class="flex flex-col items-end space-y-2">
        <span :class="getStatusBadgeClass(ticket.status)">
          {{ ticket.status.replace('_', ' ').toUpperCase() }}
        </span>
        <div class="flex space-x-2">
          <router-link 
            :to="`/tickets/${ticket.id}/edit`"
            class="text-gray-400 hover:text-black transition-colors"
            title="Edit ticket"
          >
            <Edit class="w-4 h-4" />
          </router-link>
          <button 
            @click="handleDelete"
            class="text-gray-400 hover:text-red-600 transition-colors"
            title="Delete ticket"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit, Trash2 } from 'lucide-vue-next'
import { useTicketsStore } from '@/stores/tickets'
import { useToastStore } from '@/stores/toast'

interface Props {
  ticket: {
    id: number
    title: string
    description?: string
    status: string
    createdAt: string
    updatedAt: string
  }
}

const props = defineProps<Props>()
const ticketsStore = useTicketsStore()
const toastStore = useToastStore()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  return date.toLocaleDateString()
}

const getStatusBadgeClass = (status: string) => {
  const baseClass = 'status-badge'
  switch (status) {
    case 'open':
      return `${baseClass} status-open`
    case 'in_progress':
      return `${baseClass} status-in-progress`
    case 'closed':
      return `${baseClass} status-closed`
    default:
      return `${baseClass} status-closed`
  }
}

const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    const result = await ticketsStore.deleteTicket(props.ticket.id)
    if (result.success) {
      toastStore.showSuccess('Ticket deleted successfully')
    } else {
      toastStore.showError(result.error || 'Failed to delete ticket')
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
