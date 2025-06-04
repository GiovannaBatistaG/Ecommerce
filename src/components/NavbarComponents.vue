<template>
  <nav class="z-40 w-full bg-white border-b border-gray-200 fixed z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <div class="flex items-center space-x-8">
        <div class="hidden md:flex space-x-6 text-x text-black">
          <router-link :to="{name: 'home'}" class="hover:text-gray-500">Inicio</router-link>
          <router-link :to="{name: 'categorias'}" class="hover:text-gray-500">Categorias</router-link>

        </div>
      </div>
      <div class="flex items-center space-x-4 ml-2">
        <button><i class="fa-regular fa-heart text-xl"></i></button>
        <button><i class="fa-solid fa-bag-shopping text-xl"></i></button>
        <button class="md:hidden" @click="isOpen = !isOpen">
          <i class="fa-solid fa-bars text-xl"></i>
        </button>
      </div>
    </div>

    <!-- Menu mobile -->
    <div v-if="isOpen" class="md:hidden border-t border-gray-200">
      <div class="px-4 py-2 flex flex-col space-y-2 text-sm font-medium z-40">
          <router-link :to="{name: 'home'}" class="hover:text-gray-500">Inicio</router-link>
          <router-link :to="{name: 'categorias'}" class="hover:text-gray-500">Categorias</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

