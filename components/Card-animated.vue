<template>
  <div class="p-4">
    <NuxtLink :to="`/${link}`" class="flex text-indigo-950 hover:text-indigo-500">
      <div class="mx.2 relative overflow-hidden w-60 h-80 rounded-3xl cursor-pointer text-3xl font-bold bg-indigo-400">
        <div class="z-10 absolute w-full h-full peer"></div>
        <div class="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-indigo-300 transition-all duration-500"></div>
        <div class="absolute flex text-2xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-44 rounded-full bg-indigo-300 transition-all duration-500">
          {{desc}}
        </div>
        <div class="w-full h-full items-center justify-center flex uppercase text-3xl">
          {{title}}
        </div>
      </div>
    </NuxtLink>
  </div>

</template>

<script setup>
    const props = defineProps({
      title:'title', 
      desc:'desc',
      link:'link'
    })


</script>