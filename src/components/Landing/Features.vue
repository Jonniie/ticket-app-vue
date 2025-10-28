<template>
  <section class="py-20 bg-white">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-black mb-4">Why Choose TicketApp?</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Built with modern technologies and designed for efficiency
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="feature in features" :key="feature.title" class="text-center">
          <div class="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-6">
            <component :is="feature.icon" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-semibold text-black mb-4">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Ticket, Clock, CheckCircle, Users, Shield, Zap } from 'lucide-vue-next'

const features = [
  {
    icon: Ticket,
    title: 'Easy Ticket Creation',
    description: 'Create and manage tickets with our intuitive interface. Track issues from creation to resolution.'
  },
  {
    icon: Clock,
    title: 'Real-time Updates',
    description: 'Stay informed with real-time status updates and notifications for all your tickets.'
  },
  {
    icon: CheckCircle,
    title: 'Status Tracking',
    description: 'Monitor ticket progress with clear status indicators: Open, In Progress, and Closed.'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together seamlessly with your team members on ticket resolution.'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Your data is protected with enterprise-grade security and reliability.'
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Built with Vue.js and modern technologies for lightning-fast performance.'
  }
]
</script>
