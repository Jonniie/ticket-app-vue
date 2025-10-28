<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
    <!-- SVG Wavy Background -->
    <svg
      class="absolute top-0 left-0 w-full h-full"
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Main wave -->
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color: rgba(0, 0, 0, 0.05); stop-opacity: 1" />
          <stop offset="100%" style="stop-color: rgba(0, 0, 0, 0); stop-opacity: 1" />
        </linearGradient>
      </defs>
      <path
        d="M 0,300 Q 300,350 600,300 T 1200,300 L 1200,0 L 0,0 Z"
        fill="url(#waveGradient)"
        class="wave-path"
      />
      <path
        d="M 0,250 Q 300,280 600,250 T 1200,250 L 1200,0 L 0,0 Z"
        fill="rgba(229, 231, 235, 0.3)"
        class="wave-path"
      />
    </svg>

    <!-- Decorative Circles -->
    <div
      class="decorative-circle w-40 h-40 bg-gradient-to-br from-black to-gray-700 top-10 left-8 animate-float"
    ></div>
    <div
      class="decorative-circle w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-300 top-32 right-12 animate-float-delayed"
    ></div>
    <div
      class="decorative-circle w-24 h-24 bg-gradient-to-br from-black/60 to-gray-600/60 bottom-32 left-1/4 animate-float"
    ></div>
    <div
      class="decorative-circle w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-200 bottom-20 right-1/3 animate-float-delayed"
    ></div>

    <!-- Content -->
    <div class="container-custom py-24 relative z-10">
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-7xl font-bold text-black mb-6 text-balance leading-tight">
          Modern Ticket
          <span class="block bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
            Management
          </span>
          <span class="block text-gray-600 text-5xl md:text-6xl">Made Simple</span>
        </h1>
        <p
          class="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto text-balance leading-relaxed"
        >
          Streamline your workflow with our intuitive ticket management system. Track, organize, and
          resolve issues efficiently with ease.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/auth/signup"
            class="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Get Started Free
          </router-link>
          <router-link
            to="/auth/login"
            class="btn-secondary text-lg px-8 py-4 shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Sign In
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Hero section component with wavy background and decorative elements
</script>

<style scoped>
.wave-path {
  animation: wave 8s ease-in-out infinite;
}

.wave-path:nth-child(3) {
  animation-delay: 1s;
}

@keyframes wave {
  0%,
  100% {
    d: path('M 0,300 Q 300,350 600,300 T 1200,300 L 1200,0 L 0,0 Z');
  }
  50% {
    d: path('M 0,280 Q 300,330 600,280 T 1200,280 L 1200,0 L 0,0 Z');
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 6s ease-in-out infinite;
  animation-delay: 2s;
}
</style>
