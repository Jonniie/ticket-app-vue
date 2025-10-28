/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)

  const isAuthenticated = computed(() => {
    return user.value !== null
  })

  const initializeAuth = () => {
    // Check for existing session on app load
    const session = localStorage.getItem('ticketapp_session')
    if (session) {
      try {
        const sessionData = JSON.parse(session)
        // Check if session hasn't expired
        if (sessionData.expires > Date.now()) {
          user.value = sessionData.user
        } else {
          // Session expired, remove it
          localStorage.removeItem('ticketapp_session')
        }
      } catch (error) {
        console.error('Invalid session data:', error)
        localStorage.removeItem('ticketapp_session')
      }
    }
    loading.value = false
  }

  const login = async (email: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Validate email format
      if (!email || !email.includes('@')) {
        throw new Error('Invalid email format')
      }

      // Check against stored users (from signup)
      const storedUsers = localStorage.getItem('ticketapp_users')
      if (storedUsers) {
        try {
          const users = JSON.parse(storedUsers)
          const foundUser = users.find((u: any) => u.email === email)

          if (foundUser) {
            const sessionData = {
              user: foundUser,
              token: 'mock-jwt-token-' + Date.now(),
              expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
            }

            localStorage.setItem('ticketapp_session', JSON.stringify(sessionData))
            user.value = foundUser
            return { success: true }
          }
        } catch (error) {
          console.error('Error parsing stored users:', error)
          throw new Error('An unexpected error occurred')
        }
      }

      throw new Error('Invalid credentials')
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }
    }
  }

  const signup = async (name: string, email: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Validate inputs
      if (!name || !name.trim()) {
        throw new Error('Name is required')
      }

      if (!email || !email.includes('@')) {
        throw new Error('Invalid email format')
      }

      const userData = {
        id: Date.now(),
        email: email.trim(),
        name: name.trim(),
        role: 'user',
      }

      // Store user data for future logins
      const storedUsers = localStorage.getItem('ticketapp_users')
      const users = storedUsers ? JSON.parse(storedUsers) : []

      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        throw new Error('User with this email already exists')
      }

      users.push(userData)
      localStorage.setItem('ticketapp_users', JSON.stringify(users))

      const sessionData = {
        user: userData,
        token: 'mock-jwt-token-' + Date.now(),
        expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }

      localStorage.setItem('ticketapp_session', JSON.stringify(sessionData))
      user.value = userData as any
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('ticketapp_session')
    user.value = null
  }

  return {
    user,
    loading,
    isAuthenticated,
    initializeAuth,
    login,
    signup,
    logout,
  }
})
