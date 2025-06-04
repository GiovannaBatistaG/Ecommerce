<template>

  <div class="max-w-7xl mx-auto p-6 grid lg:grid-cols-2 gap-6 mt-10">
    <div class="flex justify-center p-8 items-center">
      <img :src="product.thumbnail" class="border-2 border-black-500 w-full max-w-lg" />
    </div>
    <div class="space-y-4">
      <h1 class="text-3xl font-bold mt-6">{{ product.title }}</h1>
      <p class="text-gray-600 text-lg">{{ product.description }}</p>
      <p class="text-g text-gray-700 text-m">Categoria: {{ product.category }} </p>
      <p class="text-4xl font-semibold text-black">R$ {{ product.price }}</p>
      <div class="mt-8 flex gap-4">
        <button class="bg-black text-white px-6 py-3 rounded-full hover:opacity-90 transition">Comprar</button>
        <button class="border border-gray-400 px-6 py-3 rounded-full hover:bg-gray-100 transition">Favoritar</button>
      </div>
      <p class=' text-gray-400'>Estoque: # {{ product.stock }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref({})

onMounted(async () => {
  const { id } = route.params
  const res = await axios.get(`https://dummyjson.com/products/${id}`)
  product.value = res.data
})
</script>
