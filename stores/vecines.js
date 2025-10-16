import { defineStore } from "pinia";
import { doc, collection, getDocs, onSnapshot, updateDoc } from "firebase/firestore";


export const useVecineStore = defineStore('vecineStore', {
  state: ()=>({
    vecinos: reactive([]),
    loading: false,
    error: null,
    vecinoSelected: {}, 
    correosSelected: [],
    mesPagado:{
      monto: 0,
      fecha_pago: '',
      pagado: false
    },
    ultimoPago: null,
    addShowPropName: false,
    addShowPropCorr: false,
    addShowArrName: false,
    addShowArrCorr: false
  }),
  actions:{
    //fetching
    async fetchVecinos() {
      const { $db } = useNuxtApp()
      try{
        this.loading = true
        const {data} = useAsyncData('data', async ()=>{
          const querySnapshot = await getDocs(collection($db, "vecinos"))
          if(querySnapshot){
            querySnapshot.forEach((doc) => {
             this.vecinos = querySnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}))
            });
            this.loading = false
            this.error = null
          }
        })
       
      } catch (error) {
        this.error2 = error.message
        console.log('error', error)
        throw error
      }
    },
    
    //Selección de Vecino
    async getVecinoSelected(depto){
      for (let i = 0; i < this.vecinos.length; i++) {
        if (this.vecinos[i].depto == depto){
          this.vecinoSelected = {...this.vecinos[i]}
        }
      }
    },

    //Subir la modificación a Firestore
    async saveVecino(updatedVecino) {
      const { $db } = useNuxtApp()

      const vecinoDoc = doc($db, 'vecinos', updatedVecino.id);
      const { id, ...vecinoData } = updatedVecino; // Excluir el ID antes de guardar
      this.vecinoSelected = updatedVecino
      await updateDoc(vecinoDoc, vecinoData);
      console.log(`Vecino depto: ${updatedVecino.id} actualizado en Firestore`);
    },

    // Añadir un nombre/correo a un vecino específico
    addNuevo(vecinoId, tipo, cat, nuevo) {
      const vecino = this.vecinos.find((v) => v.id === vecinoId);
      if (!vecino || !nuevo) return;
      vecino[tipo][cat].push(nuevo);
      this.saveVecino(vecino);
    },

    // Editar un nombre/correo de un vecino específico
    editCategoria(vecinoId, tipo, cat, index, nuevoDato) {
      const vecino = this.vecinos.find((v) => v.id === vecinoId);
      if (!vecino || !nuevoDato || index < 0 || index >= vecino[tipo][cat].length) return;
      vecino[tipo][cat][index] = nuevoDato;
      this.saveVecino(vecino);
      console.log(`Vecino depto: ${vecino.id} actualizado en Firestore editado`)
    },

    // Eliminar un nombre/correo de un vecino específico
    deleteCategoria(vecinoId, tipo, cat, index) {
      const vecino = this.vecinos.find((v) => v.id === vecinoId);
      if (tipo == 'propietario' && cat == 'nombre') {
        vecino && vecino.propietario[cat].length > 1 
        ? (vecino[tipo][cat].splice(index, 1), this.saveVecino(vecino))
        : alert('No se puede eliminar Nombre porque no puede quedar sin Propietario')
      } else {
        vecino[tipo][cat].splice(index, 1);
        this.saveVecino(vecino);

      }
    }, 

    // Toggle vista de añadir nuevo propietario/arrendatario
    toggleShow(tipo, cat){
      if(tipo == 'propietario'){
        if(cat == 'nombre')
          this.addShowPropName ? this.addShowPropName = false : this.addShowPropName = true
        else {
          this.addShowPropCorr ? this.addShowPropCorr = false : this.addShowPropCorr = true
        }
      }
      else if(tipo == 'arrendatario'){
        if(cat == 'nombre')
          this.addShowArrName ? this.addShowArrName = false : this.addShowArrName = true
        else {
          this.addShowArrCorr ? this.addShowArrCorr = false : this.addShowArrCorr = true
        }
      }
    },

    //-                    VOUCHER                    

    // Ultimo mes pagado = true
    ultimoMesPagado(vecino) {
      const pagos = vecino;
      let ultimo = null;

      // Recorrer los años en orden
      const años = Object.keys(pagos).sort((a, b) => a - b);
      for (const año of años) {
        const meses = Object.keys(pagos[año]).sort((a, b) => a - b);

        // Recorrer los meses en orden
        for (const mes of meses) {
          if (pagos[año][mes].pagado) {
            ultimo = { año, mes, ...pagos[año][mes] };
          }
        }
      }
      this.ultimoPago = ultimo;
      //console.log("Último mes pagado:", ultimo);
    },

    addMesPagado(vecinoId, mes, año) {
      const vecino = this.vecinos.find((v) => v.id === vecinoId);
      /* console.log(vecino);
      console.log(vecino.pago[año][mes] + mes);
      console.log(mes, typeof mes.toString());
      console.log(año, typeof año); */
      if(!vecino || mes == 'Seleccionar Mes' || año == 'Seleccionar Año') return
      this.mesPagado = vecino.pago[año][mes]
    },

    // Añadir pago a un mes de un vecino específico
    addPagoData(vecinoId, año, mes, nuevoDato) {
      const vecino = this.vecinos.find((v) => v.id === vecinoId);
      if (!vecino || !nuevoDato ) return;
      //console.log(JSON.stringify(nuevoDato) +' nuevo dato');
      //console.log(JSON.stringify(vecino.pago)  +' vecino pre');
      //console.log(año, mes);
      vecino.pago[año][mes] = nuevoDato

      //console.log(JSON.stringify(vecino.pago)  +' vecino post');
      this.saveVecino(vecino);
      console.log(`Vecino depto: ${vecino.id} actualizado en Firestore AddPagoData`)
    },

    // Añadir/Eliminar correos para enviar voucher
    toggleOption(option) {
      if (this.correosSelected.includes(option)) {
        this.correosSelected = this.correosSelected.filter(item => item !== option)
      } else {
        this.correosSelected.push(option)
      }
    }, 

    empyCorreos(){
      this.correosSelected = []
    },

    //For Toggle Pagado in Switch
    editPagado(data){
      this.mesPagado.monto = data.monto
      this.mesPagado.fecha_pago = data.fecha_pago
      this.mesPagado.pagado = data.pagado
    }, 

    //-                     jsPDF                     

/*     async generatePDF(mes,año){
      const doc = new jsPDF({
        format:[150,130]
        });

      let y = 86
      let mayorArray
      const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      //ciclo For se realice con el array más largo
      this.vecinoSelected.propietario.nombre.length > this.vecinoSelected.arrendatario.nombre.length 
      ? mayorArray = this.vecinoSelected.propietario.nombre.length 
      :mayorArray = this.vecinoSelected.arrendatario.nombre.length

      // Encabezado
      doc.setFont("courier", "normal", "bold")
      doc.setFontSize(22);
      doc.text("COMUNIDAD ARBOLEDA", 68, 20, { align: "center" });
      doc.setFontSize(13);
      doc.text("Ricardo Cumming 343", 68, 26, { align: "center" });
  
      // Sección Datos
      doc.setFontSize(14)
      doc.text('DATOS', 66, 40, { align: "center" })
      doc.line(15,42,115,42)
      doc.line(15,42.5,115,42.5)
      doc.setFontSize(12);
      doc.setFont("courier", "normal", "bold");
      doc.text('DEPARTAMENTO', 15, 50);
      doc.setFont('Courier', "italic", "400")
      doc.text(`${this.vecinoSelected.id}`, 15, 56);
      doc.setFont("courier", "normal", "bold");
      doc.text('GASTO COMUN', 115, 50, { align: "right" });
      doc.setFont('Courier', "italic", "400")
      doc.text(`${meses[mes-1]} - ${año}`, 115, 56, { align: "right" });      

        // Sección Vecino
      doc.setFontSize(14)
      doc.setFont("courier", "normal", "bold")
      doc.text('VECINOS', 66, 70, { align: "center" })
      doc.setFont('Courier', "italic", "400")
      doc.line(15,72,115,72)
      doc.line(15,72.5,115,72.5)
      doc.setFontSize(12);
      doc.setFont("courier", "normal", "bold");
      doc.text('PROPIETARIO', 15, 80);
      this.vecinoSelected.arrendatario.nombre.length > 0 ? doc.text('ARRENDATARIO', 115, 80, { align: "right" }) :doc.text('', 115, 80, { align: "right" })
      doc.setFont('Courier', "italic", "400")

      //Iteración sobre Array de nombres
      for (let i = 0; i < mayorArray; i++) {
        let nombreProp = this.vecinoSelected.propietario.nombre[i];
        let nombreArr = this.vecinoSelected.arrendatario.nombre[i];
        if(nombreProp == undefined) nombreProp = ''
        if(nombreArr == undefined) nombreArr = ''
        doc.text(`${nombreProp}`, 15, y)
        doc.text(`${nombreArr}`, 115, y, { align: "right" })
        y = y+4
      }

      // Sección Pago
      doc.setFontSize(14)
      doc.setFont("courier", "normal", "bold")
      doc.text('PAGO', 66, (y = y+12), { align: "center" })
      doc.setFont('Courier', "italic", "400")
      doc.line(15,(y = y+2),115,y)
      doc.line(15, (y = y+0.5),115,y)
      doc.setFontSize(12);
      doc.setFont("courier", "normal", "bold")
      doc.text('MONTO', 15,(y= y+9), { align: "left" });
      doc.text('FECHA DE PAGO', 65, y, { align: "center" }); //109
      doc.text('ESTADO', 115, y, { align: "right" }); //109
      doc.setFont('Courier', "italic", "400")
      doc.text(`$ ${this.mesPagado.monto}`, 15,(y= y+6)); //115
      doc.text(`${this.mesPagado.fecha_pago}`, 65, y, { align: "center" }); //115
      doc.text('Pagado', 113.5, y, { align: "right" }); //115
      //doc.addImage("pagado.png", "PNG", 90, 128, 30, 14)

      //doc.save('comunidad.pdf')
      const pdfPath = path.join("/tmp", `comprobante_${mes}-${año}-dpto${this.vecinoSelected.id}`); // Ruta para guardar el archivo temporal
      fs.writeFileSync(pdfPath, Buffer.from(doc.output("arraybuffer")));

      try {
        const response = await useFetch("/api/send-mail", {
          method: "POST",
          body: {
            to: 'meetthemonsterr@gmail.com',
            subject: 'Comprobante' || "PDF Generado",
            text: 'comprobantepago' || "Este es tu archivo PDF adjunto.",
            attachments: [
              {
                filename: "documento.pdf", // Nombre del archivo adjunto
                path: pdfPath, // Ruta del archivo guardado
              },
            ]
          },
        });
    
        if (response.success) {
          alert("Correo enviado con éxito.");
        } else {
          alert("Error al enviar el correo: " + response.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al enviar el correo.");
      }
    } */
  }
})