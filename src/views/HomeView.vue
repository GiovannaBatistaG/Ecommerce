<template>
  <div class="bg-white text-gray-900">
       <section class="bg-gray-100 py-20 text-center">
        
      <h2 class="text-6xl font-bold mt-10">Aproveite até 50% OFF</h2>
      <p class="m-8 text-xl text-gray-600 pb-16">Ofertas válidas por tempo limitado. Garanta já o seu produto favorito.</p>
      <a href="#50">
      <button class="bg-black text-white px-12 py-4 rounded-full hover:bg-gray-800 transition duration-500">Ver Ofertas</button>
      </a>
     </section>


    <section class="max-w-7xl mx-auto py-10 px-6">
      <h2 class="text-2xl md:text-4xl font-semibold lg:text-4xl mb-6 text-center pb-4">Destaques da Semana</h2>
      <div v-if="loading" class="text-center text-gray-500">Carregando produtos...</div>
      <div v-else-if="products.length >= 4" class="grid grid-cols-1 mx-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
        <div v-for="product in products.slice(0, 8)" :key="product.id" class="border rounded-xl p-4 hover:shadow-lg transition">
          <img :src="product.thumbnail" :alt="product.title" class="w-full object-cover rounded-lg" />
          <h3 class="text-l font-semibold m1 truncate">{{ product.title }}</h3>
          <p class="text-gray-500 text-sm">{{ product.category }}</p>
          <p class="text-gray-600 mb-2">R$ {{ product.price }}</p>
          <button class="w-full bg-black text-white py-1 rounded-full hover:bg-gray-800">
            <router-link :to="`/produto/${product.id}`" class="text-white">Comprar</router-link>
          </button>     
        </div>
      </div>
    </section>

 <section class="max-w-7xl mx-auto py-12 px-4 transition transform ease-in" id="50">
      <h2 class="text-3xl md:text-4xl font-semibold lg:text-4xl mb-6 text-center pb-4">50% OFF</h2>
      <div v-if="loading" class="text-center text-gray-500">Carregando produtos...</div>
       <div v-else-if="products.length >= 16" class="grid grid-cols-1 mx-16 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="product in products.slice(8, 16)" :key="product.id" class="border rounded-xl p-4 hover:shadow-lg transition">
          <img :src="product.thumbnail" :alt="product.title" class="w-full h-48 object-cover rounded-lg mb-4" />
          <h3 class="text-lg font-semibold mb-1 truncate">{{ product.title }}</h3>
          <p class="text-gray-500 text-sm mb-2">{{ product.category }}</p>
          <p class="text-gray-600 line-through">R$ {{ product.price }}</p>
          <p class="text-red-600 mb-4 font-semibold">POR R$ {{ product.price-(product.price*0.5) }}</p>
          <button class="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition">
            <router-link :to="`/produto/${product.id}`" class="text-white">Comprar</router-link>
          </button>     
        </div>
      </div>
 </section>
  
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const loading = ref(true)


onMounted(async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products?limit=16')
    products.value = response.data.products
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
  } finally {
    loading.value = false
  }
})

</script>
