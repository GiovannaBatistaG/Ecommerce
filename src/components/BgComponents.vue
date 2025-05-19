<template>
  <div class="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-white via-indigo-100 to-indigo-200">
    <div class="absolute bottom-0 left-10 w-10 h-10 bg-indigo-300 opacity-30 rounded-full animate-bounce-slow"></div>
    <div class="absolute bottom-10 left-1/3 w-16 h-16 bg-green-700 opacity-20 rounded-full animate-bounce-slower"></div>
    <div class="absolute bottom-20 left-2/3 w-8 h-8 bg-indigo-200 opacity-25 rounded-full animate-bounce"></div>
    <div class="absolute bottom-5 left-3/4 w-12 h-12 bg-green-200 opacity-30 rounded-full animate-bounce-slow delay-2000"></div>
  </div>
</template>

<style scoped>
@keyframes bounce-slow {
  0% { transform: translateY(0); opacity: 0.3; }
  50% { transform: translateY(-50px); opacity: 0.5; }
  100% { transform: translateY(0); opacity: 0.3; }
}

@keyframes bounce-slower {
  0% { transform: translateY(0); opacity: 0.2; }
  50% { transform: translateY(-80px); opacity: 0.4; }
  100% { transform: translateY(0); opacity: 0.2; }
}

.animate-bounce-slow {
  animation: bounce-slow 10s ease-in-out infinite;
}

.animate-bounce-slower {
  animation: bounce-slower 15s ease-in-out infinite;
}

.delay-2000 {
  animation-delay: 2s;
}
</style>


<!-- video de ref, mais modificações https://youtu.be/Tmkr2kKUEgU?si=efrO0dAezJw8mgYS -->