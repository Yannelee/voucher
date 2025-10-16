<template>
  <div>
    <Form :vecino='vecineStore.vecinos' />
  </div>
</template>

<script setup>
  import { useVecineStore } from "~/stores/vecines";
  useHead({
    title: 'Comprobante',
  })

  const vecineStore = useVecineStore()
  const  { vecinoSelected, mesPagado} = storeToRefs(vecineStore)


</script>