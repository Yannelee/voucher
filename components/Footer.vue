<template>
  <footer class=" bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 font-mono">
    <span class="text-sm text-gray-500 sm:text-center">{{new Date().getFullYear()}} Yanny. All Rights Reserved.
    </span>
    <ul v-if="links" class="flex flex-wrap items-center mt-5 text-sm font-medium text-gray-500 sm:mt-0 ">
      <li><NuxtLink to="/" class="hover:text-indigo-400 mx-5">Inicio</NuxtLink></li>
      <li><NuxtLink to="/vecinos" class="hover:text-indigo-400 mx-5" >Vecinos</NuxtLink></li>
      <li><NuxtLink to="/gasto-comun" class="hover:text-indigo-400 mx-5">Gasto Común</NuxtLink></li>
    </ul>
</footer>
</template>

<script setup>
  const { links } = defineProps(['links'])

</script>