<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container-custom py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-black mb-2">Tickets</h1>
          <p class="text-gray-600">Manage and track all your tickets</p>
        </div>
        <router-link to="/tickets/new" class="btn-primary mt-4 sm:mt-0 flex items-center">
          <Plus class="w-5 h-5 mr-2" />
          New Ticket
        </router-link>
      </div>

      <!-- Filters -->
      <div class="card mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex flex-col sm:flex-row gap-4">
            <select v-model="statusFilter" class="input-field sm:w-auto">
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>

            <select v-model="priorityFilter" class="input-field sm:w-auto">
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div class="flex items-center space-x-2">
            <Search class="w-5 h-5 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search tickets..."
              class="input-field sm:w-64"
            />
          </div>
        </div>
      </div>

      <!-- Tickets List -->
      <div v-if="filteredTickets.length > 0" class="space-y-4">
        <TicketCard v-for="ticket in filteredTickets" :key="ticket.id" :ticket="ticket" />
      </div>

      <div v-else class="text-center py-12">
        <div
          class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Ticket class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
        <p class="text-gray-500 mb-6">
          {{
            ticketsStore.tickets.length === 0
              ? 'Get started by creating your first ticket.'
              : 'Try adjusting your filters or search terms.'
          }}
        </p>
        <router-link v-if="ticketsStore.tickets.length === 0" to="/tickets/new" class="btn-primary">
          <Plus class="w-5 h-5 mr-2" />
          Create First Ticket
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Plus, Search, Ticket } from 'lucide-vue-next'
import { useTicketsStore } from '@/stores/tickets'
import TicketCard from '@/components/Tickets/TicketCard.vue'

const ticketsStore = useTicketsStore()

const statusFilter = ref('')
const priorityFilter = ref('')
const searchQuery = ref('')

const filteredTickets = computed(() => {
  let filtered = ticketsStore.tickets

  // Filter by status
  if (statusFilter.value) {
    filtered = filtered.filter((ticket) => ticket.status === statusFilter.value)
  }

  // Filter by priority
  if (priorityFilter.value) {
    filtered = filtered.filter((ticket) => ticket.priority === priorityFilter.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(query) ||
        (ticket.description && ticket.description.toLowerCase().includes(query)),
    )
  }

  return filtered
})

onMounted(() => {
  ticketsStore.loadTickets()
})
</script>
