<template>
  <div>
    <h1>Subir JSON a Firestore</h1>
    <input type="file" @change="handleFileUpload" />
    <button @click="uploadToFirestore">Subir a Firestore</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNuxtApp } from '#app';
import { collection, addDoc } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';

const jsonData = ref([]);
const { $db } = useNuxtApp(); // Acceso a Firestore desde el plugin

// Maneja la carga del archivo JSON
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      jsonData.value = JSON.parse(e.target.result);
      console.log('Archivo cargado:', jsonData.value);
    } catch (error) {
      console.error('Error al parsear el archivo JSON:', error);
    }
  };

  reader.readAsText(file);
};

// Subir datos a Firestore
const uploadToFirestore = async () => {
  if (!jsonData.value.length) {
    alert('Carga un archivo antes de intentar subir los datos.');
    return;
  }

  try {
    for (const obj of jsonData.value) {
      const docRef = doc($db, 'vecinos', obj.depto.toString()); // Usa el campo 'depto' como ID
      await setDoc(docRef, obj);
    }

    alert('Datos subidos exitosamente a Firestore.');
  } catch (error) {
    console.error('Error al subir los datos a Firestore:', error);
  }
};
</script>
