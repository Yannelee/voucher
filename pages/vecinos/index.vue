<template>
  <div>
    <ListCard :vecino='vecineStore.vecinos'/>

  </div>
</template>

<script setup>
  import { useVecineStore } from "~/stores/vecines";
  useHead({
    title: 'Vecinos',
  })

  const vecineStore = useVecineStore()
  vecineStore.fetchVecinos()
  
</script> 