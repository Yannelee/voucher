<template>
  <div class="text-xs">
    <!-- Iterar sobre los años -->
    <div v-for="(meses, year) in vecino" :key="year" class="mb-4 ">
      <h3 class="text-md font-semibold mb-2">Año: {{ year }}</h3>
      <!-- Iterar sobre los meses -->
      <div  class="grid lg:grid-cols-3 gap-3">

        <div v-for="(detalle, mes) in meses" :key="mes" class="border p-4 rounded shadow ">
          <div class="flex items-center gap-4 justify-between">
            <h4 class="font-medium mb-2">Mes: {{ mes }}</h4>
            <NuxtLink to=# class="flex"><PencilIcon class="ml-0.5 mr-1.5 size-5 text-gray-200" aria-hidden="true" /></NuxtLink>
          </div>
          <p><strong>Pagado:</strong> {{ detalle.pagado ? "Sí" : "No" }}</p>
          <p><strong>Monto:</strong> ${{ detalle.monto }}</p>
          <p><strong>Fecha de Pago:</strong> {{ detalle.fecha_pago || "No registrado" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import {PencilIcon} from '@heroicons/vue/20/solid'
  const { vecino } = defineProps(['vecino'])
  const vecineStore = useVecineStore()


</script>