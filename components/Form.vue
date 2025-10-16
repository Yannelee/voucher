<template>
  <div class="isolate bg-white px-6 py-10 sm:py-10 lg:px-8 font-serif text-gray-600 min-h-dvh">
    <form action="#" @submit.prevent="sendEmail" method="POST" class="mx-auto mt-10 max-w-xl sm:mt-16 font-mono">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Comunidad Arboleda</h2>
        <p class="text-lg/8 text-gray-600 mb-10">Ricardo Cumming 343</p>

        <!-- 
        //-    DATOS                       
        -->
        <div class="mx-auto max-w-2xl text-center relative flex pt-5 items-center">
            <div class="flex-grow border-t border-gray-400"></div>
            <span class="flex-shrink mx-4 text-gray-400">Datos</span>
            <div class="flex-grow border-t border-gray-400"></div>
        </div>

        <p class="mt-4 me-2 text-lg/8 text-gray-600 font-semibold">DEPARTAMENTO </p>   
        <div v-if="vecineStore.loading" class="flex justify-center gap-4 mt-5">
          <span class="font-bold text-indigo-500">Cargando Vecinos </span>
          <ArrowPathIcon class="animate-spin ml-0.5 mr-1.5 size-5 text-blue-500" aria-hidden="true" />
        </div>       
        <h3 v-else class="text-center mb-5">
            <select v-model="selected" required id="depto" name="depto" @change="refreshPay(selected.pago), seleccionar(selected.id), pagado(selected.id, mesPago, añoPago)" class="rounded-md text-center border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6">
                <option selected disabled :value="selected == 'Seleccionar Departamento' ? selected :selected.depto"> Seleccionar Departamento</option>
                <option v-for="v in vecino" :key="v" v-bind:value="{depto: v.depto, propName: v.propietario.nombre, propEmail:v.propietario.correos, arrName:v.arrendatario.nombre, arrEmail:v.arrendatario.correos, pago:v.pago, id:v.id}">{{v.depto}}</option>
            </select> 
        </h3>
        <span v-if="selected !== 'Seleccionar Departamento'" class="mt-2 me-2 text-lg/8 text-gray-600 font-semibold">Fecha Voucher a Pagar </span>
        <div v-if="selected !== 'Seleccionar Departamento'" class="">

          <select v-model="añoPago" @change="changeYear(añoPago, mesPago), pagado(selected.id, mesPago, añoPago)" id="año" name="año" required class="me-2 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6 text-center">
              <option selected disabled default='Seleccionar Año'>Seleccionar Año</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
          </select> 

          <select v-model="mesPago" :disabled="(añoPago == 'Seleccionar Año')" @change="toggleEdit(), pagado(selected.id, mesPago, añoPago)" required id="mes" name="mes" class="me-2 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 disabled:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6 text-center">
              <option default='Seleccionar Mes' disabled selected>Seleccionar Mes</option>
              <option v-if="añoPago == '2024'" value="12" class="border-b-4">Diciembre</option>
              <option v-else v-for="m in meses" :key="m" :value="añoPago == '2024' ? '12' :meses.indexOf(m) + 1" class="border-b-4">{{m}}</option>
          </select> 
        </div>
      </div>

      <!-- 
      //-   INFO VECINO                      
       -->
      <div class="mx-auto max-w-2xl text-center relative flex pt-5 items-center" v-if="añoPago !== 'Seleccionar Año' && mesPago !== 'Seleccionar Mes'">
          <div class="flex-grow border-t border-gray-400"></div>
          <span class="flex-shrink mx-4 text-gray-400">Vecino</span>
          <div class="flex-grow border-t border-gray-400"></div>
      </div>
      <span class="flex text-black justify-end items-center gap-x-2" >
        <NuxtLink v-if="añoPago !== 'Seleccionar Año' && mesPago !== 'Seleccionar Mes'" :to="`/vecinos/${selected.id}`" class="flex items-center bg-white hover:bg-gray-100 text-xs p-1 ps-2 mb-3 text-gray-800 border border-gray-200 rounded">Editar  <PencilIcon class="ml-0.5 mr-1.5 size-3 text-green-400" aria-hidden="true" /></NuxtLink>
      </span>

      <div v-if="añoPago !== 'Seleccionar Año' && mesPago !== 'Seleccionar Mes'" id="datos" class="mx-auto max-w-2xl text-center flex justify-between flex-wrap gap-3">
        <div class="text-start">
          <h3 class="font-bold">PROPIETARIO</h3>
          <h3 class="" v-for="n in selected.propName" :key="n">{{n}}</h3>
          <div v-for="c in selected.propEmail" :key="c" class="flex items-center">
            <input type="checkbox" class="me-4" id="propCorr" name="correo" :value="c" :disabled="mesPagado.pagado && !resendVoucher" :checked="corrSel2.includes(c)" @change="toggleSelection(c)">
            <label id="propCorr" >{{c}}</label>
          </div>
        </div>
        <div class="text-start" v-if="selected !== 'Seleccionar Departamento'">
          <div v-if="selected.arrName.length !== 0 || selected.arrEmail.length !== 0">
            <h3 class="font-bold">ARRENDATARIO</h3>
            <h3 class="" v-for="n in selected.arrName" :key="n">{{n}}</h3>
            <div v-for="c in selected.arrEmail" :key="c" class="flex items-center">
              <input type="checkbox"  class="me-4" id="arrCorreo" name="correo" :value="c" :disabled="mesPagado.pagado && !resendVoucher" :checked="corrSel2.includes(c)" @change="toggleSelection(c)">
              <label id="arrCorreo">{{c}}</label>
            </div>
          </div>
        </div>
      </div>
      
<!-- 
        //- PAGO                       
-->
      <div v-if="añoPago !== 'Seleccionar Año' && mesPago !== 'Seleccionar Mes'" class="mx-auto max-w-2xl text-center relative flex py-5 items-center">
          <div class="flex-grow border-t border-gray-400"></div>
          <span class="flex-shrink mx-4 text-gray-400">Pago</span>
          <div class="flex-grow border-t border-gray-400"></div>
      </div>

      <div  v-if="añoPago !== 'Seleccionar Año' && mesPago !== 'Seleccionar Mes' && mesPagado.monto !== 0" class="flex text-black justify-end items-center gap-x-2" >
        <button v-if="mesPagado" v-show="!pagoEdit" @click="savePagoData(mesPagado.monto, mesPagado.fecha_pago, mesPagado.pagado), pagoEdit = !pagoEdit" type="button" class="flex bg-white hover:bg-gray-100 text-xs p-1 ps-2 text-gray-800 border border-gray-200 rounded">Editar<PencilIcon class="ml-0.5 mr-1.5 size-3 text-green-400" aria-hidden="true" /></button>
        <button v-if="mesPagado" v-show="!pagoEdit" @click="savePagoData(mesPagado.monto, mesPagado.fecha_pago, mesPagado.pagado),rmvPayData(selected.id, mesPago, añoPago, selected)" type="button" class="flex bg-white hover:bg-gray-100 text-xs p-1 ps-2 text-gray-800 border border-gray-200 rounded">Eliminar<XCircleIcon class="ml-0.5 mr-1.5 size-4 text-red-400" aria-hidden="true" /></button>
        <button v-if="pagoEdit" @click="cancelEdit(pagoDataSaved), pagoEdit = !pagoEdit, resendVoucher = !resendVoucher" type="button" class="flex text-black justify-end  items-center text-gray-400 text-xs">Cancelar<PencilIcon class="ml-0.5 mr-1.5 size-3 text-gray-400" aria-hidden="true" /></button>
      </div>


      <div v-if="añoPago !== 'Seleccionar Año' && mesPago !== 'Seleccionar Mes'" id="pago" class=" max-w-2xl my-5" >
<!-- 
        //- REGISTRA PAGO EN MES SELECCIONADO     
 -->
        <div>
          <div class="flex sm:justify-between items-start flex-wrap  gap-6 flex-col sm:flex-row">
            <div class="">
              <label for="pago" class="block text-m font-bold me-5">MONTO $:</label>
              <input v-show="mesPagado.monto !== 0 && mesPagado.pagado && mesPagado.fecha_pago != ''" type="number" v-model="mesPagado.monto" id="pago" :disabled="!pagoEdit && mesPagado.monto !== 0" required :class="[!pagoEdit ? 'text-slate-400' : 'text-black', 'border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300']">
              <input v-show="mesPagado.monto == 0 && !mesPagado.pagado" type="number" v-model="montoPago" id="pago" placeholder="Sólo ingresar números" required class="text-black border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300']">
              <div>
              </div>
            </div>
            <div class="text-start">
              <h3 class="font-bold">FECHA PAGO</h3>
              <div class="text-center"> 
                <input v-if="mesPagado.fecha_pago !== '' || mesPagado.pagado" type="text" id="pago" name="fechaPago" v-model="mesPagado.fecha_pago" @input="fecha(fechaPago)" :disabled="!pagoEdit  && mesPagado.fecha_pago !== ''" :class="[!pagoEdit ? 'text-slate-400 p-1' : 'text-black']" required/>
                <input v-if="mesPagado.fecha_pago == '' && !mesPagado.pagado" type="date" id="pago" name="fechaPago" v-model="fechaPago" @input="fecha(fechaPago)" required/>
              </div>
            </div>
            <div class="flex gap-x-4 sm:justify-center justify-start sm:flex-col" v-if="mesPagado.pagado">
              <h3 class="font-bold">PAGADO</h3>
              <div class="text-center">
                <SwitchGroup as="div" class="">
                  <div class="flex h-6 items-center justify-center">
                    <Switch  v-if="mesPagado.monto !== 0 && (mesPagado.pagado || mesPagado.fecha_pago != '')" v-model="mesPagado.pagado" :disabled="(mesPagado.monto !== 0 && mesPagado.pagado && mesPagado.fecha_pago != '')" :class="[mesPagado.pagado ? 'bg-slate-600' : 'bg-gray-200', 'flex w-8 flex-none rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600']">
                      <span aria-hidden="true" :class="[mesPagado.pagado ? 'translate-x-3.5' : 'translate-x-0', 'size-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out']" />
                    </Switch>
                  </div>
                </SwitchGroup>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 text-center text-sm">
          <p v-if="ultimoPago" class="font-semibold text-indigo-800">ÚLTIMO PAGO REGISTRADO:  <span class="font-light">{{ meses[ultimoPago.mes - 1]}} del {{ultimoPago.año}}</span></p>
          <p v-if="!ultimoPago" class="font-semibold text-orange-800">NO SE REGISTRAN PAGOS PREVIOS</p>
        </div>
      </div>
<!-- 
        //-           MENSAJE                       
-->
      <div v-if="añoPago !== 'Seleccionar Año' && mesPago !== 'Seleccionar Mes' && (pagoEdit || !mesPagado.pagado)" class="mb-5">
        <button v-if="!mssg" @click="mssg = !mssg" type="button" class="flex bg-white hover:bg-gray-100 text-xs p-1 ps-2 text-gray-800 border border-gray-200 rounded items-center gap-x-2 mb-2 mx-auto">Añadir Mensaje <PlusCircleIcon class="ml-0.5 mr-1.5 size-3 text-green-500" aria-hidden="true" /></button>
        <button v-if="mssg" @click="mssg = !mssg" type="button" class="flex bg-white hover:bg-gray-100 text-xs p-1 ps-2 text-gray-800 border border-gray-200 rounded items-center gap-x-2 mb-2 mx-auto">Ocultar <EyeSlashIcon class="ml-0.5 mr-1.5 size-3 text-slate-500" aria-hidden="true" /></button>
        <textarea v-show="mssg" name="mssg" id="mssg" v-model="mensaje" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
      </div>
<!-- 
        //-            ENVIO VOUCHER               
 -->
      <div v-if="añoPago !== 'Seleccionar Año' && mesPago !== 'Seleccionar Mes' && !mesPagado.pagado && !pagoEdit" class="mx-auto max-w-2xl text-center relative flex py-5 items-center">
          <div class="flex-grow border-t border-gray-400"></div>
          <span class="flex-shrink mx-4 text-gray-400">Envío Voucher</span>
          <div class="flex-grow border-t border-gray-400"></div>
      </div>

      <div class="my-2 sm:my-10 grow basis-1" hidden>
        <button v-if="añoPago !== 'Seleccionar Año' && mesPago !== 'Seleccionar Mes' && ! mesPagado.pagado && !pagoEdit" type="button" @click="vecineStore.generatePDF(mesPago, añoPago)" class=" w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          PDF</button>
      </div>

      <div v-if="añoPago !== 'Seleccionar Año' && mesPago !== 'Seleccionar Mes' && !mesPagado.pagado && !pagoEdit" id="mssgCorreo" class="mt-10">
        <div class="mx-auto max-w-2xl text-center" v-if="corrSel2.length > 0">
          <h3 class="font-bold" >VOUCHER SE ENVIARÁ A: <p v-for="c in corrSel2" :key="c" class="font-medium text-start">{{c}}</p></h3>
        </div>
        <div class="mx-auto max-w-2xl text-center" v-else>
          <h3 class="font-bold" >SELECCIONA CORREOS PARA ENVÍO DE VOUCHER</h3>
        </div>
      </div>
      <div class="mx-auto max-w-2xl text-center text-sm mt-5" v-show="pagoEdit">
        <h3 v-if="corrSel2.length <1" class="font-light mb-2">*Si desea volver a envíar comprobante, debe seleccionar email.</h3>
        <h3 v-else v-for="c in corrSel2" :key="c" class="font-light mb-2">{{c}}</h3>
      </div>

<!-- 
      //.BOTONES 
-->
      <div v-show="pagoEdit" class="flex flex-col sm:flex-row items-center justify-center gap-2">

        <!-- //* EDITAR -->
        <div class="">
          <button type="button" @click="resendVoucher = !resendVoucher" :hidden="resendVoucher" class=" w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Reenviar Voucher Editado</button>
        </div>
        <div class="" v-if="resendVoucher">
          <button type="button" :disabled="corrSel2.length<1" @click="sendEmail(selected, mesPago, añoPago, mensaje, mesPagado.monto, mesPagado.fecha_pago), addPayData('editar', selected.id, añoPago, mesPago, mesPagado.fecha_pago, mesPagado.monto, mesPagado.pagado), pagoEdit = !pagoEdit, resendVoucher = !resendVoucher" :class="[corrSel2.length<1 ?'bg-indigo-300':'bg-indigo-600','w-full rounded-md  px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600']">
            Enviar Comprobante</button>
        </div>

        <div class="" v-if="!resendVoucher">
          <button type="button" @click="addPayData('editar', selected.id, añoPago, mesPago, mesPagado.fecha_pago, mesPagado.monto, mesPagado.pagado), pagoEdit = !pagoEdit" class=" w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Guardar Cambios sin Reenviar</button>
        </div>
      </div>

      <!-- //* AÑADIR PAGO -->
      <div v-if="añoPago !== 'Seleccionar Año' && mesPago !== 'Seleccionar Mes' && !mesPagado.pagado && !pagoEdit" class="my-10">
        <button type="submit" :disabled="!(corrSel2.length>=1 && montoPago && fechaPago)" @click="addPayData('añadir', selected.id, añoPago, mesPago, fechita, montoPago, true, selected), sendEmail(selected, mesPago, añoPago, mensaje, montoPago, fechita)" :class="[(corrSel2.length>=1 && montoPago && fechaPago) ? 'bg-indigo-600':'bg-indigo-300','w-full rounded-md  px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600']">
          Generar Pago</button>
      </div>

    </form>

  </div>
</template>

<script setup>
  import { useVecineStore } from "~/stores/vecines";
  import { storeToRefs } from 'pinia'
  import { ChevronDownIcon, PencilIcon, XCircleIcon, PlusCircleIcon, MinusCircleIcon, EyeSlashIcon, ArrowPathIcon } from '@heroicons/vue/20/solid'
  import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

  const vecineStore = useVecineStore()
  vecineStore.fetchVecinos()

  const { vecino } = defineProps(['vecino'])
  const { vecinoSelected } = storeToRefs(vecineStore)
  const { correosSelected: corrSel2 } = storeToRefs(vecineStore)
  const { ultimoMesPagado, ultimoPago, addPagoData, addMesPagado, mesPagado, editPagado, generatePDF } = storeToRefs(vecineStore)

  const selected = defineModel('selected', {default: 'Seleccionar Departamento'})
  const fechaPago = defineModel('fechaPago')
  const añoPago = defineModel('añoPago',{default: 'Seleccionar Año'})
  const mesPago = defineModel('mesPago',{default: 'Seleccionar Mes'})
  const montoPago = defineModel('montoPago')
  const switchPago = defineModel('switchPago', {default: false})
  const mensaje = defineModel('mensaje')

  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  let fechita, pagoDataSaved
  const pagoEdit = ref(false)
  const resendVoucher = ref(false)
  const mssg = ref(false)
  
  //-                      FUNCIONES                          

  //STRING FECHA CON FORMATO DD/MM/AAAA
  const fecha = (dia) =>{
    fechita = new Date(dia).toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0,10)
    if(fechita.includes('Invalid')) fechita = ''
  }
  //SELECCIONA MES DICIEMBRE SI AÑO ES 2024, DEVUELVE A SELECCIONAR MES SI CAMBIA A 2025
  const changeYear = (año, mes) =>{
    añoPago.value === '2024' ? mesPago.value = '12' :mesPago.value = 'Seleccionar Mes'
    toggleEdit()
  }

  //DEVUELVE LA INFORMACIÓN DE PAGO -MES PAGADO- DEL DEPARTAMENTO SELECCIONADO
  const pagado = (id, mes, año) => {
    if (mes !== 'Seleccionar Mes' || año !== 'Seleccionar Año') {
      vecineStore.addMesPagado(id, mes, año)
    }
  }

  const validarFecha = fecha => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = fecha.match(regex);

    if (!match) return false

    // Extraer día, mes y año del string
    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10);
    const anio = parseInt(match[3], 10);

    // Días máximos por mes (considerando febrero en años bisiestos)
    const diasPorMes = [31, (anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if ((mes < 1 || mes > 12) || (dia < 1 || dia > diasPorMes[mes - 1])) return false

    // Si todo es válido, retornar true
    return true;
  }

  //INGRESA LA INFORMACIÓN DE PAGO AL STORE/FIRESTORE DEL DEPARTAMENTO SELECCIONADO
  const addPayData = (tipo, id, año, mes, fecha, monto, pago, selected) => {
    if(tipo == 'añadir'){
      !fecha || fecha == '' || corrSel2.value.length == 0
      ? console.log('Se debe seleccionar Fecha de Pago y Correos para enviar voucher')
      : (vecineStore.addPagoData(id, año, mes, {'pagado': pago, 'monto': monto,'fecha_pago': fecha}), vecineStore.addMesPagado(id, mes, año), refreshPay(selected.pago))
    }
    else{
      if(!validarFecha(fecha)) alert('Fecha inválida formato MM/DD/AAAA, el mes debe ir de 1 a 12 y el día de 1 a 31 dependendiendo del mes')
      else{
        pago && monto != 0 && fecha != '' 
        ? vecineStore.addPagoData(id, año, mes, {'pagado': pago, 'monto': monto,'fecha_pago': fecha}) 
        : alert('Todas las casillas deben estar rellenadas o activadas')
      }
    }
    setTimeout(() => {
      borrarCorreos()
      mensaje.value = ''
      mssg.value = false
      console.log("Retrasado por 5 segundo.");
    }, "5000");

    
  }

  //BORRA LA INFORMACIÓN DE PAGO EN EL STORE/FIRESTORE DEL DEPARTAMENTO SELECCIONADO
  const rmvPayData = (id, mes, año, selected) => {
    let sure = window.confirm('Estas seguro que quieres eliminar el pago de '+ meses[mes-1]+ ' '+ año )
    if (sure){
      vecineStore.addPagoData(id, año, mes, {'pagado': false, 'monto': 0,'fecha_pago': ''})
      vecineStore.addMesPagado(id, mes, año)
      montoPago.value = 0
      fechaPago.value = ''
      switchPago.value = false
      borrarCorreos()
      refreshPay(selected.pago)
    }
  }

  //GUARDA EN UNA VARIABLE LOS DATOS DE V-MODEL ANTES DE CUALQUIER CAMBIO.
  const savePagoData = (monto, fecha, pago) => pagoDataSaved = {'monto': monto,'fecha_pago': fecha,'pagado': pago}

  //VUELVE A LOS DATOS ANTES DEL CAMBIO, SI SE CANCELA LA EDICIÓN
  const cancelEdit = (data) => {
    vecineStore.editPagado(data)
    if (mssg) mssg.value = false
    if (resendVoucher) mssg.value = false
  }

  // Llama a la acción del store para agregar o eliminar la opción
  const toggleSelection = (option) => vecineStore.toggleOption(option)
  
  const borrarCorreos = () => vecineStore.empyCorreos()

  const toggleEdit = () => pagoEdit.value = false

  //DEVUELVE EL ULTIMO MES PAGADO POR DEPARTAMENTO
  const refreshPay = (vecino) => vecineStore.ultimoMesPagado(vecino);

  const alerta = (texto) => alert(texto)

  //INGRESA LOS DATOS DEL VECINO SELECCIONADO SEGUN ID AL STORE
  const seleccionar = (id) => vecineStore.getVecinoSelected(id)

  //-                MAIL                            
const sendEmail = async (selected, mes, año, mensaje, monto, fecha ) => {

  const response = await $fetch('/api/send-mail', {
    method: 'POST',
    body: {
      to: vecineStore.correosSelected,
      subject: `Comprobante Pago de Gasto Común depto ${selected.id} - ${meses[mes-1]} ${año}`,
      html: `
          <div style="text-align: center; margin-bottom: 20px;">
            <h3 style="font-size: 24px; margin: 0;">Estimado ${selected.arrName ? 'Propietario y Arrendatario' :'Propietario'} se envía comprobante de pago de gasto común</h3>
            <p style="margin: 5px 0; font-size: 18px; font-bold color: #555;">${mensaje ? 'Nota:  ':''}</p> 
            <p style="margin: 5px 0; font-size: 16px; color: #555;">${mensaje ? mensaje :''}</p> 
          </div>
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="font-size: 24px; margin: 0;">Comunidad Arboleda</h1>
                <p style="margin: 5px 0; font-size: 14px; color: #555;">Ricardo Cumming 343</p>
            </div>

            <div style="margin-bottom: 20px;">
                <h2 style="font-size: 18px; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Datos</h2>
                <div style="margin-bottom: 10px;">
                    <span style="font-weight: bold;">Departamento:</span> ${selected.id}
                </div>
                <div style="margin-bottom: 10px;">
                    <span style="font-weight: bold;">Gasto Común:</span> ${meses[mes-1]} - ${año}
                </div>
                <div style="margin-bottom: 10px;">
                    <span style="font-weight: bold;">Propietario:</span> ${selected.propName}
                </div>
                <div style="margin-bottom: 10px;">
                    <span style="font-weight: bold;">Arrendatario:</span> ${selected.arrName}
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <h2 style="font-size: 18px; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Pago</h2>
                <div style="margin-top: 10px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th style="border: 1px solid #ddd; text-align: left; padding: 8px; background-color: #f4f4f4;">Monto</th>
                                <th style="border: 1px solid #ddd; text-align: left; padding: 8px; background-color: #f4f4f4;">Fecha de Pago</th>
                                <th style="border: 1px solid #ddd; text-align: left; padding: 8px; background-color: #f4f4f4;">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #ddd; text-align: left; padding: 8px;">$${monto}</td>
                                <td style="border: 1px solid #ddd; text-align: left; padding: 8px;">${fecha}</td>
                                <td style="border: 1px solid #ddd; text-align: left; padding: 8px;">Pagado</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
      `,
    },
  });

  if (response.success) {
    console.log(response.message);
  } else {
    console.error(response.message, response.error, response);
  }

};

</script>