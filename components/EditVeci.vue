<template> 
  <div>
    <div v-if="!(vecinoSelected, id, tipo, category)">
      {{console.log(vecinoSelected, id, tipo, category)}}
      <p>Error</p>
    </div>
    <div v-else>

  <!-- INPUT DE PROPIETARIOS/ARRENDATARIOS -->
      <ul class="sm:col-span-3">
        <li class="mt-2" v-for="(n, index) in vecinoSelected[tipo][category]" :key="n">
          <div class="flex items-center gap-4">
            <input v-model="vecinoSelected[tipo][category][index]" :type="category == 'nombre' ? 'text' :'email'" name="propName" id="propName" disabled class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            <button type="button" @click="editValor(vecinoSelected.id, tipo, category, index)" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <PencilIcon class="-ml-0.5 mr-1.5 size-5 text-yellow-400" aria-hidden="true" />
              <span class="hidden sm:block">Editar</span>
            </button>
            <button type="button" @click="deleteValor(vecinoSelected.id, tipo, category, index)" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <UserMinusIcon class="-ml-0.5 mr-1.5 size-5 text-red-400" aria-hidden="true" />
              <span class="hidden sm:block">Eliminar</span>
            </button>
          </div >
        </li>
      </ul>

  <!-- INPUT PARA AÑADIR NUEVOS PROPIETARIOS -->
      <div v-if="(tipo == 'propietario')">
        <div v-if="(category == 'nombre') ? addShowPropName :addShowPropCorr" class="flex items-center gap-4 mt-4">
          <input v-model="newName" :type="category == 'nombre' ? 'text' :'email'" :pattern="category == 'correos' ? '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$' : ''" name="newName" id="newName" :placeholder="(category == 'nombre') ? 'Nuevo Propietario' :'Nuevo Correo'" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          <button type="button" @click="addNew(vecinoSelected.id, tipo, category, newName)" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <UserPlusIcon class="-ml-0.5 mr-1.5 size-5 text-blue-400" aria-hidden="true" />
            <span class="hidden sm:block">Añadir</span>
          </button>
        </div>
      </div>

  <!-- INPUT PARA AÑADIR NUEVOS ARRENDATARIOS -->
      <div v-if="(tipo == 'arrendatario')">
        <div v-if="(category == 'nombre') ? addShowArrName :addShowArrCorr" class="flex items-center gap-4 mt-4">
          <input v-model="newName" :type="category == 'nombre' ? 'text' :'email'" name="newName" id="newName" :placeholder="(category == 'nombre') ? 'Nuevo Arrendatario' :'Nuevo Correo'" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          <button type="button" @click="addNew(vecinoSelected.id, tipo, category, newName)" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <UserPlusIcon class="-ml-0.5 mr-1.5 size-5 text-blue-400" aria-hidden="true" />
            <span class="hidden sm:block">Añadir</span>
          </button>
        </div>
      </div>

  <!-- BOTONES PARA MOSTRAR INPUT PARA AGREGAR NUEVOS ARRENDATARIOS/PROPIETARIOS, NOMBRES Y CORREOS -->
      <div v-if="tipo == 'propietario'">
        <button v-show="category == 'nombre' ? !addShowPropName : !addShowPropCorr" type="button" @click='changeShow(tipo, category)' class="inline-flex mt-2 items-center rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm hover:bg-gray-50"><PlusCircleIcon class="-ml-0.5 mr-1.5 size-4 text-indigo-600" aria-hidden="true" /><span class="sm:block">{{category == 'nombre' ? 'Nuevo Propietario' : 'Nuevo correo'}}</span></button>
        <button v-show="category == 'nombre' ? addShowPropName : addShowPropCorr " type="button" @click='changeShow(tipo, category)' class="inline-flex mt-2 items-center rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm hover:bg-gray-50"><EyeSlashIcon class="-ml-0.5 mr-1.5 size-4 text-gray-400" aria-hidden="true" /> <span class="hidden sm:block">Ocultar</span></button>
      </div>

      <div v-if="tipo == 'arrendatario'">
        <button v-show="category == 'nombre' ? !addShowArrName : !addShowArrCorr " type="button" @click='changeShow(tipo, category)' class="inline-flex mt-2 items-center rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm hover:bg-gray-50"><PlusCircleIcon class="-ml-0.5 mr-1.5 size-4 text-indigo-600" aria-hidden="true" /><span class="sm:block">{{category == 'nombre' ? 'Nuevo Arrendatario' : 'Nuevo correo'}}</span></button>
        <button v-show="category == 'nombre' ? addShowArrName : addShowArrCorr " type="button" @click='changeShow(tipo, category)' class="inline-flex mt-2 items-center rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm hover:bg-gray-50"><EyeSlashIcon class="-ml-0.5 mr-1.5 size-4 text-gray-400" aria-hidden="true" /> <span class="hidden sm:block">Ocultar</span></button>
      </div>
    </div>

  </div>
</template>

<script setup>
    import { storeToRefs } from 'pinia'
    import { UserPlusIcon, PencilIcon, UserMinusIcon, PlusCircleIcon, EyeSlashIcon } from '@heroicons/vue/20/solid'
    
    const vecineStore = useVecineStore()
    const  { vecinoSelected, addShowPropName, addShowPropCorr, addShowArrName, addShowArrCorr} = storeToRefs(vecineStore)

    const props = defineProps({
      id:'id', 
      tipo:'tipo', 
      vecinoSelected: 'vecinoSelected', 
      category: 'category'
    })

    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    
    //.PARA EL V-MODEL
    let newName

    //.FUNCIONES
    const addNew = (vecinoId, tipo, cat, nombre) => {
      if (!nombre) return
      if (cat == 'correos'){
        nombre.match(regexEmail) ? (vecineStore.addNuevo(vecinoId, tipo, cat, nombre), vecineStore.toggleShow(tipo, cat)) : alert('Debes ingresar un correo válido');
      } else {
        vecineStore.addNuevo(vecinoId, tipo, cat, nombre)
        vecineStore.toggleShow(tipo, cat)
      }
      newName = ''
    };

    const editValor = (vecinoId, tipo, cat, index) => {
      let nameValor = vecineStore.vecinoSelected[tipo][cat][index]
      let dato = window.prompt('Estas seguro que quieres editar a '+ nameValor, nameValor)
      if (cat == 'correos'){
        dato.match(regexEmail) ? vecineStore.editCategoria(vecinoId, tipo, cat, index, dato) : alert('Debes ingresar un correo válido');
      } else {
        vecineStore.editCategoria(vecinoId, tipo, cat, index, dato)
      }
    }

    const deleteValor = (vecinoId, tipo, cat, index) => {
      let nameEdit = vecineStore.vecinoSelected[tipo][cat][index]
      let sure = window.confirm('Estas seguro que quieres eliminar a '+ nameEdit)
      if (sure) vecineStore.deleteCategoria(vecinoId, tipo, cat, index)
    }

    const changeShow = (tipo, category) => vecineStore.toggleShow(tipo, category)
</script>