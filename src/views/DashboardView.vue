<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container-custom py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-black mb-2">
          Welcome back, {{ authStore.user?.name }}!
        </h1>
        <p class="text-gray-600">
          Here's an overview of your ticket management system.
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Tickets"
          :value="stats.total"
          :icon="Ticket"
          color="black"
        />
        <StatsCard
          title="Open Tickets"
          :value="stats.open"
          :icon="AlertCircle"
          color="green"
        />
        <StatsCard
          title="In Progress"
          :value="stats.inProgress"
          :icon="Clock"
          color="amber"
        />
        <StatsCard
          title="Closed Tickets"
          :value="stats.closed"
          :icon="CheckCircle"
          color="gray"
        />
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Activity -->
        <div class="card">
          <h3 class="text-lg font-semibold text-black mb-4">Recent Activity</h3>
          <div class="space-y-4">
            <div v-if="recentTickets.length > 0">
              <div 
                v-for="ticket in recentTickets" 
                :key="ticket.id"
                class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div :class="['w-2 h-2 rounded-full', getStatusColor(ticket.status)]"></div>
                <div class="flex-1">
                  <p class="font-medium text-sm">{{ ticket.title }}</p>
                  <p class="text-xs text-gray-500">
                    {{ ticket.updatedAt !== ticket.createdAt ? 'Updated' : 'Created' }} {{ formatTimeAgo(ticket.updatedAt) }}
                  </p>
                </div>
                <span :class="getStatusBadge(ticket.status)">
                  {{ ticket.status.replace('_', ' ').toUpperCase() }}
                </span>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <p class="text-gray-500 text-sm">No recent activity</p>
              <p class="text-gray-400 text-xs mt-1">Create your first ticket to get started</p>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card">
          <h3 class="text-lg font-semibold text-black mb-4">Quick Actions</h3>
          <div class="space-y-4">
            <router-link 
              to="/tickets" 
              class="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div class="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Ticket class="w-5 h-5 text-white" />
              </div>
              <div class="flex-1">
                <p class="font-medium text-black">Manage Tickets</p>
                <p class="text-sm text-gray-600">View and manage all tickets</p>
              </div>
            </router-link>
            
            <router-link 
              to="/tickets/new" 
              class="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div class="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Plus class="w-5 h-5 text-white" />
              </div>
              <div class="flex-1">
                <p class="font-medium text-black">Create New Ticket</p>
                <p class="text-sm text-gray-600">Add a new ticket to the system</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Ticket, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useTicketsStore } from '@/stores/tickets'
import StatsCard from '@/components/Dashboard/StatsCard.vue'

const authStore = useAuthStore()
const ticketsStore = useTicketsStore()

const stats = computed(() => ticketsStore.getTicketStats)

// Get recent tickets (last 3, sorted by updatedAt)
const recentTickets = computed(() => {
  return ticketsStore.tickets
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)
})

const formatTimeAgo = (dateString: string) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  return date.toLocaleDateString()
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'bg-green-500'
    case 'in_progress': return 'bg-yellow-500'
    case 'closed': return 'bg-gray-400'
    default: return 'bg-gray-400'
  }
}

const getStatusBadge = (status: string) => {
  const statusClasses = {
    open: 'status-badge status-open',
    in_progress: 'status-badge status-in-progress',
    closed: 'status-badge status-closed'
  }
  return statusClasses[status as keyof typeof statusClasses] || 'status-badge status-closed'
}

onMounted(() => {
  ticketsStore.loadTickets()
})
</script>
