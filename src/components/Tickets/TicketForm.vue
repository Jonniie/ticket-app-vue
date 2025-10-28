<template>
  <div class="max-w-2xl mx-auto">
    <div class="card">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-black">
          {{ isEdit ? 'Edit Ticket' : 'Create New Ticket' }}
        </h2>
        <p class="text-gray-600 mt-1">
          {{ isEdit ? 'Update the ticket details below.' : 'Fill in the details to create a new ticket.' }}
        </p>
      </div>

      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2 mb-6">
        <AlertCircle class="w-5 h-5 text-red-600 shrink-0" />
        <span class="text-red-800 text-sm">{{ error }}</span>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            v-model="formData.title"
            :class="['input-field', { 'border-red-300 focus:ring-red-500': errors.title }]"
            placeholder="Enter ticket title"
          />
          <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="4"
            :class="['input-field resize-none', { 'border-red-300 focus:ring-red-500': errors.description }]"
            placeholder="Enter ticket description (optional)"
          />
          <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
          <p class="mt-1 text-xs text-gray-500">
            {{ formData.description.length }}/1000 characters
          </p>
        </div>

        <!-- Status and Priority -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
              Status {{ isEdit ? '*' : '(Auto-set to Open)' }}
            </label>
            <select
              id="status"
              v-model="formData.status"
              :disabled="!isEdit"
              :class="[
                'input-field',
                { 'border-red-300 focus:ring-red-500': errors.status },
                { 'bg-gray-100 cursor-not-allowed': !isEdit }
              ]"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <p v-if="errors.status" class="mt-1 text-sm text-red-600">{{ errors.status }}</p>
            <p v-if="!isEdit" class="mt-1 text-xs text-gray-500">
              New tickets are automatically set to "Open" status
            </p>
          </div>

          <div>
            <label for="priority" class="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              id="priority"
              v-model="formData.priority"
              class="input-field"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="$router.push('/tickets')"
            class="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Ticket' : 'Create Ticket') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AlertCircle } from 'lucide-vue-next'
import { useTicketsStore } from '@/stores/tickets'
import { useToastStore } from '@/stores/toast'

const route = useRoute()
const router = useRouter()
const ticketsStore = useTicketsStore()
const toastStore = useToastStore()

const isEdit = ref(false)
const loading = ref(false)
const error = ref('')
const errors = reactive<Record<string, string>>({})

const formData = reactive({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium'
})

onMounted(() => {
  isEdit.value = route.name === 'ticket-edit'
  
  if (isEdit.value && route.params.id) {
    const ticketId = parseInt(route.params.id as string)
    const ticket = ticketsStore.getTicketById(ticketId)
    
    if (ticket) {
      formData.title = ticket.title
      formData.description = ticket.description || ''
      formData.status = ticket.status
      formData.priority = ticket.priority || 'medium'
    } else {
      router.push('/tickets')
    }
  }
})

const validateForm = () => {
  const newErrors: Record<string, string> = {}
  
  if (!formData.title.trim()) {
    newErrors.title = 'Title is required'
  }
  
  if (!formData.status) {
    newErrors.status = 'Status is required'
  } else if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
    newErrors.status = 'Status must be open, in_progress, or closed'
  }
  
  if (formData.description && formData.description.length > 1000) {
    newErrors.description = 'Description must be less than 1000 characters'
  }
  
  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    let result
    if (isEdit.value) {
      const ticketId = parseInt(route.params.id as string)
      result = await ticketsStore.updateTicket(ticketId, formData)
    } else {
      result = await ticketsStore.createTicket(formData)
    }
    
    if (result.success) {
      toastStore.showSuccess(isEdit.value ? 'Ticket updated successfully' : 'Ticket created successfully')
      router.push('/tickets')
    } else {
      error.value = result.error || 'Failed to save ticket'
      toastStore.showError(result.error || 'Failed to save ticket')
    }
  } catch (err) {
    error.value = 'An unexpected error occurred. Please try again.'
    toastStore.showError('An unexpected error occurred. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>
