<template>
  <div
    :class="['fixed top-0 left-0 w-full z-50 transition-transform duration-500', isVisible ? 'translate-y-0' : '-translate-y-full']"
  >
    <nav class="text-indigo-900 py-4 pt-8 flex justify-center items-center">
      <ul class="flex gap-6 text-lg font-2xl font-semibold bg-gray-200 p-1 pl-3 pr-3 rounded-full">
        <li>
          <router-link to="/" class="hover:text-indigo-600">Início</router-link>
        </li>
        <li>
          <router-link to="/about" class="hover:text-indigo-600">Sobre</router-link>
        </li>
        <li>
          <router-link to="/contact" class="hover:text-indigo-600">Contato</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(true)
let lastScroll = window.scrollY

const handleScroll = () => {
  const currentScroll = window.scrollY
  isVisible.value = currentScroll < lastScroll || currentScroll <= 0
  lastScroll = currentScroll
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
