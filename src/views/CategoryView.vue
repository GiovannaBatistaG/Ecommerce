<template>
  <div class="bg-white text-gray-900">
    <section class="max-w-7xl mx-auto py-12 px-4">
    
      <div class="fixed md:hidden z-0 mt-6 text-left">
        <button
          @click="isSidebarOpen = true"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <i class="fa-solid fa-filter mr-2"></i>
          Filtrar Categorias
        </button>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
       
        <aside :class="sidebarClasses">
          <div class="flex justify-between items-center md:block">
            <h3 class="text-xl font-semibold mb-0 md:mb-4 text-gray-800">Categorias</h3>
            <button @click="isSidebarOpen = false" class="md:hidden text-gray-600 hover:text-gray-800 text-2xl">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <ul class="space-y-1">
            <li>
              <button
                @click="selectCategoryFromSidebar(null)"
                :class="[
                  'w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition text-gray-700',
                  !selectedCategory ? 'bg-gray-200 font-semibold text-gray-900' : ''
                ]"
              >
                Todas as Categorias
              </button>
            </li>
            <li v-for="category in displayCategories" :key="category.slug">
              <button
                @click="selectCategoryFromSidebar(category.slug)"
                :class="[
                  'w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition truncate text-gray-700',
                  selectedCategory === category.slug ? 'bg-gray-200 font-semibold text-gray-900' : ''
                ]"
                :title="category.name"
              >
                {{ category.name }}
              </button>
            </li>
          </ul>
        </aside>

    
        <main class="w-full md:w-3/4 lg:w-4/5">
          <h2 class="text-3xl md:text-4xl mb-8 text-center md:text-left font-bold text-gray-800 mt-10">Nossos Produtos</h2>

          <!-- Controles de Filtro/Busca -->
          <div class="mb-8 flex flex-col sm:flex-row gap-4 justify-start items-center">
            <input
              type="text"
              v-model="searchTerm"
              placeholder="  em todas as categorias..."
              @keyup.enter="handleSearchImmediately"
              class="border border-gray-300 p-2 rounded-md w-full sm:w-auto flex-grow sm:max-w-md focus:ring-2 focus:ring-black focus:border-black outline-none"
            />
            <button
              @click="handleSearchImmediately"
              class="bg-black text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition w-full sm:w-auto shrink-0"
            >
              Buscar
            </button>
            <button
              v-if="searchTerm && !selectedCategory"
              @click="clearSearchInput"
              class="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-full hover:bg-gray-300 transition w-full sm:w-auto shrink-0"
            >
              Limpar
            </button>
          </div>

          <div v-if="loading" class="text-center text-gray-500 py-10">Carregando produtos...</div>
          <div v-if="error" class="text-center text-red-500 py-10">{{ error }}</div>

          <div v-if="!loading && !error && products.length === 0" class="text-center text-gray-500 py-10">
            Nenhum produto encontrado.
          </div>

          <div v-if="!loading && !error && products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="product in products" :key="product.id" class="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition flex flex-col">
              <img :src="product.thumbnail" :alt="product.title" class="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 class="text-lg font-semibold mb-1 truncate text-gray-800">{{ product.title }}</h3>
              <p class="text-sm text-gray-500 mb-2">{{ product.category }}</p>
              <p class="text-xl font-medium text-gray-900 mb-4">R$ {{ product.price }}</p>
              <button class="w-full mt-auto bg-black text-white py-2 rounded-full hover:bg-gray-800 transition">
                <router-link :to="{ name: 'produto', params: { id: product.id } }" class="text-white block w-full h-full">Ver Detalhes</router-link>
              </button>
            </div>
          </div>

      <div v-if="!loading && !error && products.length > 0 && totalPages > 1" class="mt-12 flex justify-center items-center space-x-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span class="text-gray-700">Página {{ currentPage }} de {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>

        </main>
      </div>
    </section>

    <!-- Overlay para fechar a sidebar em telas menores -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const searchTerm = ref(''); 

const selectedCategory = ref(null);
const allCategories = ref([]);
const debounceTimer = ref(null);
const currentPage = ref(1);
const limit = ref(12); 
const totalProducts = ref(0);

const isSidebarOpen = ref(false);
const route = useRoute();
const router = useRouter();

const totalPages = computed(() => {
  return Math.ceil(totalProducts.value / limit.value)
});

const sidebarClasses = computed(() => [
  'p-4 border-gray-200 rounded-lg shadow-sm bg-white transform transition-transform duration-300 ease-in-out',
  'md:w-1/4 lg:w-1/5 md:sticky md:top-24 md:h-fit md:border md:translate-x-0', // Estilos Desktop
  // Estilos Mobile:
  'fixed top-0 left-0 h-full w-4/5 max-w-xs z-40 overflow-y-auto border-r',
  isSidebarOpen.value ? 'translate-x-0' : '-translate-x-full',
]);


const displayCategories = computed(() => {
  return allCategories.value.map(slug => ({
    name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    slug: slug
  })).sort((a, b) => a.name.localeCompare(b.name)); 
});

async function fetchAllCategories() {
  try {
    const response = await axios.get('https://dummyjson.com/products/categories');

    allCategories.value = response.data.map(category => typeof category === 'string' ? category : category.name);
  } catch (e) {
    console.error("Falha ao buscar lista de categorias:", e);
  }
}

async function fetchProducts() {
  loading.value = true;
  error.value = null;
  try {
    let baseUrl = 'https://dummyjson.com/products';
    const params = new URLSearchParams();
    params.append('limit', limit.value.toString());
    params.append('skip', ((currentPage.value - 1) * limit.value).toString());

    const currentSearchTerm = searchTerm.value.trim();

  
    if (selectedCategory.value) {
      baseUrl += `/category/${selectedCategory.value}`;
    } else if (currentSearchTerm !== '') {

      const currentSearchTermLower = currentSearchTerm.toLowerCase();
      if (allCategories.value.includes(currentSearchTermLower)) {
      
        baseUrl += `/category/${currentSearchTermLower}`;
      } else {
        baseUrl += `/search`;
        params.append('q', currentSearchTerm);
      }
    }
  

    const response = await axios.get(baseUrl, { params });
    products.value = response.data.products;
    totalProducts.value = response.data.total;
  } catch (e) {
    console.error('Erro ao buscar produtos:', e);
    error.value = 'Falha ao carregar os produtos. Tente novamente mais tarde.';
    products.value = [];
    totalProducts.value = 0;
  } finally {
    loading.value = false;
  }
}

function performSearch() {
  currentPage.value = 1;
  fetchProducts();
}

watch(searchTerm, (newSearchTermValue) => {
  const categoryNameFromSlug = selectedCategory.value ? displayCategories.value.find(c => c.slug === selectedCategory.value)?.name : null;

  if (selectedCategory.value && newSearchTermValue !== categoryNameFromSlug) {
     selectedCategory.value = null;
  }

  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
  }
  debounceTimer.value = setTimeout(() => {
    performSearch();
  }, 500);
});

function handleSearchImmediately() {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
  }
  performSearch();
}

function clearSearchInput() {
  searchTerm.value = '';
  if (selectedCategory.value) {
    selectedCategory.value = null;
  }

}

function selectCategoryFromSidebar(categorySlug) {
  selectedCategory.value = categorySlug;
  searchTerm.value = categorySlug ? displayCategories.value.find(c => c.slug === categorySlug)?.name || categorySlug : '';
  router.push({ name: 'categorias', query: categorySlug ? { category: categorySlug } : {} });
  handleSearchImmediately();
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchProducts();
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchProducts();
  }
}

onMounted(async () => {
  await fetchAllCategories();


  if (route.query.category) {
    const categoryFromQuery = Array.isArray(route.query.category) ? route.query.category[0] : route.query.category;
    if (allCategories.value.includes(categoryFromQuery)) {
      selectedCategory.value = categoryFromQuery;
      
      searchTerm.value = displayCategories.value.find(c => c.slug === categoryFromQuery)?.name || categoryFromQuery;
    }
  } else if (route.query.q) {
    searchTerm.value = Array.isArray(route.query.q) ? route.query.q[0] : route.query.q;
    selectedCategory.value = null; 
  }
  performSearch(); // Realiza a busca inicial
});


watch(() => route.query, (newQuery, oldQuery) => {
  let needsSearch = false;
  const newCategoryQuery = Array.isArray(newQuery.category) ? newQuery.category[0] : newQuery.category;
  const oldCategoryQuery = Array.isArray(oldQuery.category) ? oldQuery.category[0] : oldQuery.category;
  const newSearchQuery = Array.isArray(newQuery.q) ? newQuery.q[0] : newQuery.q;
  const oldSearchQuery = Array.isArray(oldQuery.q) ? oldQuery.q[0] : oldQuery.q;

  if (newCategoryQuery && newCategoryQuery !== selectedCategory.value) {
    if (allCategories.value.includes(newCategoryQuery)) {
      selectedCategory.value = newCategoryQuery;
      searchTerm.value = displayCategories.value.find(c => c.slug === newCategoryQuery)?.name || newCategoryQuery;
      needsSearch = true;
    }
  } else if (newSearchQuery !== undefined && newSearchQuery !== searchTerm.value) {
    searchTerm.value = newSearchQuery;
    selectedCategory.value = null;
    needsSearch = true;
  } else if (!newCategoryQuery && !newSearchQuery) { 
    if (selectedCategory.value !== null || searchTerm.value !== '') {
        selectedCategory.value = null;
        searchTerm.value = '';
        needsSearch = true;
    }
  }

  if(needsSearch) {
    performSearch();
  }
}, { deep: true }); 
</script>
