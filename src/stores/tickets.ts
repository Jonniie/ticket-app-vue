import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTicketsStore = defineStore('tickets', () => {
  const tickets = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Helper function to get user-specific storage key
  const getTicketsStorageKey = () => {
    return 'ticketapp_tickets'
  }

  // Load tickets from localStorage
  const loadTickets = () => {
    // Check if user is authenticated by checking localStorage directly
    const session = localStorage.getItem('ticketapp_session')
    if (!session) {
      tickets.value = []
      return
    }

    try {
      const sessionData = JSON.parse(session)
      if (sessionData.expires <= Date.now()) {
        tickets.value = []
        return
      }
    } catch {
      tickets.value = []
      return
    }

    const storageKey = getTicketsStorageKey()
    const savedTickets = localStorage.getItem(storageKey)
    if (savedTickets) {
      try {
        tickets.value = JSON.parse(savedTickets)
      } catch (error) {
        console.error('Error loading tickets:', error)
        tickets.value = []
      }
    }
  }

  // Save tickets to localStorage
  const saveTickets = () => {
    // Check if user is authenticated by checking localStorage directly
    const session = localStorage.getItem('ticketapp_session')
    if (!session) return

    try {
      const sessionData = JSON.parse(session)
      if (sessionData.expires <= Date.now()) return
    } catch {
      return
    }

    if (tickets.value.length > 0) {
      const storageKey = getTicketsStorageKey()
      localStorage.setItem(storageKey, JSON.stringify(tickets.value))
    }
  }

  const createTicket = async (ticketData: any) => {
    loading.value = true
    error.value = null

    try {
      // Validate required fields
      if (!ticketData.title || !ticketData.title.trim()) {
        throw new Error('Title is required')
      }

      if (!ticketData.status || !['open', 'in_progress', 'closed'].includes(ticketData.status)) {
        throw new Error('Invalid status')
      }

      if (ticketData.description && ticketData.description.length > 1000) {
        throw new Error('Description must be less than 1000 characters')
      }

      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call

      const newTicket = {
        id: Date.now(),
        ...ticketData,
        title: ticketData.title.trim(),
        description: ticketData.description?.trim() || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      tickets.value = [newTicket, ...tickets.value]
      saveTickets()
      return { success: true, ticket: newTicket }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create ticket'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const updateTicket = async (id: number, updates: any) => {
    loading.value = true
    error.value = null

    try {
      // Validate ticket exists
      const existingTicket = tickets.value.find((t) => t.id === id)
      if (!existingTicket) {
        throw new Error('Ticket not found')
      }

      // Validate updates
      if (updates.title !== undefined && (!updates.title || !updates.title.trim())) {
        throw new Error('Title is required')
      }

      if (updates.status && !['open', 'in_progress', 'closed'].includes(updates.status)) {
        throw new Error('Invalid status')
      }

      if (updates.description && updates.description.length > 1000) {
        throw new Error('Description must be less than 1000 characters')
      }

      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call

      tickets.value = tickets.value.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              ...updates,
              title: updates.title ? updates.title.trim() : ticket.title,
              description: updates.description ? updates.description.trim() : ticket.description,
              updatedAt: new Date().toISOString(),
            }
          : ticket,
      )

      saveTickets()
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update ticket'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const deleteTicket = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      // Validate ticket exists
      const existingTicket = tickets.value.find((t) => t.id === id)
      if (!existingTicket) {
        throw new Error('Ticket not found')
      }

      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call

      tickets.value = tickets.value.filter((ticket) => ticket.id !== id)
      saveTickets()
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete ticket'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const getTicketById = (id: number) => {
    return tickets.value.find((ticket) => ticket.id === id)
  }

  const getTicketsByStatus = (status: string) => {
    return tickets.value.filter((ticket) => ticket.status === status)
  }

  const getTicketStats = computed(() => {
    const total = tickets.value.length
    const open = tickets.value.filter((t) => t.status === 'open').length
    const inProgress = tickets.value.filter((t) => t.status === 'in_progress').length
    const closed = tickets.value.filter((t) => t.status === 'closed').length

    return { total, open, inProgress, closed }
  })

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  return {
    tickets,
    loading,
    error,
    loadTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
    getTicketsByStatus,
    getTicketStats,
    setError,
  }
})
