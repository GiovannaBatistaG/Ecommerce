<template>

  <div>
    <Navbar />
      <router-view/>
      <Bg />
    </div>
    
</template>


<script setup>
import Navbar from './components/NavbarComponents.vue';
import Bg from './components/BgComponents.vue'

</script>