<template>
  <section class="relative py-24 bg-white overflow-hidden">
    <!-- Decorative background circles -->
    <div class="absolute top-20 right-20 w-72 h-72 bg-black/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-32 left-20 w-64 h-64 bg-gray-600/5 rounded-full blur-3xl"></div>

    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-black mb-4">Why Choose TicketApp?</h2>
        <div class="w-16 h-1 bg-gradient-to-r from-black to-gray-400 mx-auto mb-6"></div>
        <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Built with modern technologies and designed for efficiency
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(feature, index) in features" :key="feature.title" class="feature-card group">
          <!-- Card Container -->
          <div
            class="h-full bg-white rounded-2xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl hover:border-black/20 hover:scale-105 cursor-pointer relative overflow-hidden"
          >
            <!-- Gradient overlay on hover -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-black/0 to-black/0 group-hover:from-black/5 group-hover:to-black/10 transition-all duration-300"
            ></div>

            <!-- Content -->
            <div class="relative z-10">
              <!-- Icon Container -->
              <div
                class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                :class="`${getIconBgColor(index)}`"
              >
                <component :is="feature.icon" class="w-8 h-8 text-white" />
              </div>

              <!-- Title -->
              <h3
                class="text-xl font-semibold text-black mb-4 group-hover:text-black transition-colors"
              >
                {{ feature.title }}
              </h3>

              <!-- Description -->
              <p class="text-gray-600 leading-relaxed mb-4">{{ feature.description }}</p>

              <!-- Arrow indicator -->
              <div
                class="flex items-center text-black font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
              >
                <span>Learn More</span>
                <svg
                  class="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            <!-- Decorative circle in corner -->
            <div
              class="absolute top-0 right-0 w-20 h-20 bg-black/5 rounded-full -mr-10 -mt-10 group-hover:bg-black/10 transition-colors duration-300"
            ></div>
          </div>
        </div>
      </div>

      <!-- Bottom decorative section -->
      <div class="mt-20 pt-12 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="text-4xl font-bold text-black mb-2">100%</div>
            <p class="text-gray-600">Free to Use</p>
          </div>
          <div class="text-center p-6">
            <div class="text-4xl font-bold text-black mb-2">24/7</div>
            <p class="text-gray-600">Customer Support</p>
          </div>
          <div class="text-center p-6">
            <div class="text-4xl font-bold text-black mb-2">10k+</div>
            <p class="text-gray-600">Happy Users</p>
          </div>
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
    description:
      'Create and manage tickets with our intuitive interface. Track issues from creation to resolution with comprehensive details.',
  },
  {
    icon: Clock,
    title: 'Real-time Updates',
    description:
      'Stay informed with real-time status updates and notifications for all your tickets and team activities.',
  },
  {
    icon: CheckCircle,
    title: 'Status Tracking',
    description:
      'Monitor ticket progress with clear status indicators: Open, In Progress, and Closed for complete visibility.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Work together seamlessly with your team members on ticket resolution and project management.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Your data is protected with enterprise-grade security and reliability standards.',
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description:
      'Built with Vue.js and modern technologies for lightning-fast performance and responsiveness.',
  },
]

const getIconBgColor = (index: number) => {
  const colors = [
    'bg-gradient-to-br from-black to-gray-700',
    'bg-gradient-to-br from-gray-700 to-black',
    'bg-gradient-to-br from-black/80 to-gray-600',
    'bg-gradient-to-br from-gray-600 to-black/80',
    'bg-gradient-to-br from-black to-gray-700',
    'bg-gradient-to-br from-gray-700 to-black',
  ]
  return colors[index % colors.length]
}
</script>

<style scoped>
.feature-card {
  perspective: 1000px;
}
</style>
