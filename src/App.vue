<template>

  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <router-view/>
    </main>
    <Footer />
  </div>
</template>


<script setup>
import Navbar from './components/NavbarComponents.vue';
import Footer from './components/FooterComponents.vue';

</script> 