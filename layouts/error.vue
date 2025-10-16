<template>
  <div class="error-page">
    <h1>¡Ups! Algo salió mal ({{ error.statusCode }})</h1>
    <p>{{ error.message || 'Por favor, inténtalo de nuevo más tarde.' }}</p>
    <NuxtLink to="/">Volver al inicio</NuxtLink>
  </div>
</template>

<script setup>
const error = useError();

useHead({
    title: 'Error',
    meta: [
      { name: 'description', content: 'página de error' }
    ],
  })
</script>