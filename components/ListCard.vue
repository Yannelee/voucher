<template>
  <div>
    <h1 class="text-2xl text-slate-700 font-bold text-center mt-10">Listado de Vecinos</h1>
    <div v-if="vecineStore.loading" class="flex justify-center gap-4 mt-5">
          <span class="font-bold text-indigo-500">Cargando Vecinos </span>
          <ArrowPathIcon class="animate-spin ml-0.5 mr-1.5 size-5 text-indigo-500" aria-hidden="true" />
    </div>      
    <div v-else class="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:mt-8 sm:pt-4 lg:mx-0 lg:max-w-none md:grid-cols-2 lg:grid-cols-3 ">
      <div v-for="v in vecino" :key="v" class="rounded-xl border border-slate-200 bg-neutral-50 p-4 m-3 hover:border-slate-200 hover:shadow-xl">
        <div  class="flex items-center gap-4 justify-between">
          <h2 class="text-lg font-medium text-indigo-950 flex-basis-2">Depto {{v.depto}}</h2>
          <div class="">
            <NuxtLink :to="`/vecinos/${v.depto}`" class="flex text-indigo-950 hover:text-indigo-500">Editar  <PencilIcon class="ml-0.5 mr-1.5 size-5 text-indigo-400" aria-hidden="true" /></NuxtLink>
          </div>
        </div>
        <ol class="mt-4 space-y-2">
          <li v-if="v.propietario.correos.length !==0 || v.propietario.nombre.length !==0 ">
            <span class="block h-full rounded-lg border border-slate-200 p-4 ">
              <strong class="font-light text-sm text-indigo-950">Propietario</strong>
              <div v-for="n in v.propietario.nombre" :key="n">
                <p  class="mt-1 text-s font-medium text-indigo-950">{{n}} </p>
              </div >
              <div v-for="(p, index) in v.propietario.correos" :key="p">
                <p  class="mt-1 text-xs font-medium text-indigo-950">Email {{index+1}}: {{p}} </p>
              </div >
            </span>
          </li>
          <li v-if="v.arrendatario.correos.length !==0 || v.arrendatario.nombre.length !==0 ">
            <span class="block h-full rounded-lg border border-slate-200 p-4 ">
              <strong class="font-light text-sm text-indigo-950">Arrendatario</strong>
              <div v-for="n in v.arrendatario.nombre" :key="n">
                <p  class="mt-1 text-s font-medium text-indigo-950">{{n}} </p>
              </div >
              <div v-for="(p, index) in v.arrendatario.correos" :key="p">
                <p  class="mt-1 text-xs font-medium text-indigo-950">Email {{index+1}}: {{p}} </p>
              </div >
            </span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { PencilIcon, ArrowPathIcon} from '@heroicons/vue/20/solid'
  
  const { vecino } = defineProps(['vecino'])
  
  const vecineStore = useVecineStore()
  const { loading } = storeToRefs(vecineStore)
</script>