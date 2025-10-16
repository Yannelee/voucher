<template>
  <header class="bg-indigo-50 font-mono">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Inicio</span>
          <BuildingOffice2Icon class="text-indigo-800 size-10 hover:text-indigo-400" />
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <NuxtLink to="/vecinos" class="text-sm/6 font-semibold text-gray-900 hover:text-indigo-600">Vecinos</NuxtLink>
        <NuxtLink to="/gasto-comun" class="text-sm/6 font-semibold text-gray-900 hover:text-indigo-600">Gasto Comun</NuxtLink>
      </PopoverGroup>
<!--       <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <NuxtLink to="#" class="text-sm/6 font-semibold text-gray-900">Cerrar Sesión <span aria-hidden="true">&rarr;</span></NuxtLink>
      </div> -->
    </nav>
    <Dialog class="lg:hidden font-mono" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-sm/6 font-semibold text-gray-900">
            <span class="sr-only">Inicio</span>
            <BuildingOffice2Icon class="text-indigo-800 size-10 hover:text-indigo-400" />
          </NuxtLink>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <NuxtLink to="/vecinos" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:text-indigo-600" @click="mobileMenuOpen = false">Vecinos</NuxtLink>
              <NuxtLink to="/gasto-comun" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:text-indigo-600" @click="mobileMenuOpen = false">Gasto Comun</NuxtLink>
            </div>
<!--        
             //-       V2.0          
            <div class="py-6">
              <NuxtLink to="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Cerrar Sesión</NuxtLink>
            </div> 
-->
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon, BuildingOffice2Icon } from '@heroicons/vue/20/solid'

const mobileMenuOpen = ref(false)
</script>