<template>
  <div class="min-h-screen flex items-center justify-center gap-4 sm:gap-x-10 flex-col sm:flex-row">
    <Card-animated title="Vecinos" desc="Ir al listado" link='vecinos'/>
    <Card-animated title="Voucher" desc="Generar Comprobante" link='gasto-comun' />
  </div>
</template>

<script setup>
  import { useVecineStore } from "~/stores/vecines";
  import { storeToRefs } from 'pinia'

  useHead({
    title: 'Inicio',
  })

  definePageMeta({
    layout: 'inicio'
  })

  const vecineStore = useVecineStore()
  const  { vecinoSelected, mesPagado} = storeToRefs(vecineStore)
  
  vecineStore.fetchVecinos()
  

</script> 