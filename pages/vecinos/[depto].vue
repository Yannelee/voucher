<template>
  <div class="min-h-screen">
    <div v-if="vecineStore.vecinos.length == 0" class="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 class="font-bold text-center mx-auto text-3xl my-5">Ups, error de carga de datos</h1>
      <span class="flex text-black justify-center items-center gap-x-2" >
        <NuxtLink to="/vecinos" class="group relative py-2 px-3 overflow-hidden rounded-lg bg-white text-lg shadow">
          <div class="absolute inset-0 w-3 bg-indigo-500 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span class="relative flex items-center ms-5 text-indigo-500 group-hover:text-white">Volver <ArrowLeftCircleIcon class="mx-3 size-5 text-indigo-500 group-hover:text-white" aria-hidden="true" /></span>
        </NuxtLink>
      </span>
    </div>

    <div v-else class="max-w-4xl mx-auto">
      <h1 class="font-bold text-center mx-auto text-2xl my-5">Depto {{ depto }}</h1>
      
      <!-- PROPIETARIO -->
      <div id="propietario" class="mb-5">
        <div class="mx-auto max-w-4xl text-center relative flex py-5 items-center">
          <div class="flex-grow border-t border-gray-400"></div>
          <span class="flex-shrink mx-4 text-gray-400">Propietario</span>
          <div class="flex-grow border-t border-gray-400"></div>
        </div>

        <EditVeci :id='vecineStore.vecinoSelected.id' tipo='propietario' :vecinoSelected='vecineStore.vecinoSelected' category='nombre' />
        <EditVeci :id='vecineStore.vecinoSelected.id' tipo='propietario' :vecinoSelected='vecineStore.vecinoSelected' category='correos' />
      </div>

      <!-- ARRENDATARIO -->
      <div id="arrendatario">
      <div class="mx-auto max-w-4xl text-center relative flex py-5 items-center">
          <div class="flex-grow border-t border-gray-400"></div>
          <span class="flex-shrink mx-4 text-gray-400">{{(vecinoSelected.arrendatario.nombre.length !== 0 || vecinoSelected.arrendatario.correos.length !== 0) ? 'Arrendatario' :'No Registra Arrendatario'}}</span>
          <div class="flex-grow border-t border-gray-400"></div>
      </div>

        <EditVeci :id='vecineStore.vecinoSelected.id' tipo='arrendatario' :vecinoSelected='vecineStore.vecinoSelcted' category='nombre' />
        <EditVeci :id='vecineStore.vecinoSelected.id' tipo='arrendatario' :vecinoSelected='vecineStore.vecinoSelcted' category='correos' />
      </div>

      <span class="flex text-black justify-center items-center gap-x-2 mt-10" >
        <NuxtLink to="/vecinos" class="group relative py-2 px-3 overflow-hidden rounded-lg bg-white text-lg shadow">
          <div class="absolute inset-0 w-3 bg-indigo-500 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span class="relative flex items-center ms-5 text-indigo-500 group-hover:text-white">Volver <ArrowLeftCircleIcon class="mx-3 size-5 text-indigo-500 group-hover:text-white" aria-hidden="true" /></span>
        </NuxtLink>
      </span>

      <!-- PAGOS -->
<!--       <div id="pagos">
        <div class="mx-auto max-w-4xl text-center relative flex py-5 items-center">
            <div class="flex-grow border-t border-gray-400"></div>
            <span class="flex-shrink mx-4 text-gray-400">Pagos</span>
            <div class="flex-grow border-t border-gray-400"></div>
        </div>
        <PaymentCard :vecino='vecineStore.vecinoSelected.pago'/>
      </div> -->
    </div>
  </div>
</template>

<script setup>
  import { useVecineStore } from "~/stores/vecines";
  import { storeToRefs } from 'pinia'
  import { ArrowLeftCircleIcon } from '@heroicons/vue/20/solid'

  const { depto } = useRoute().params
  const vecineStore = useVecineStore()
  const { vecinoSelected, getVecinoSelected } = storeToRefs(vecineStore)

  vecineStore.getVecinoSelected(depto)

</script> 